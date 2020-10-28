import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { db } from '../../config';
import request from 'request';
import cheerio from 'cheerio';
import firebase from 'firebase';

const Crawling = () => {
    const [url, setURL] = useState('');

    const CrawlingSync = (RecipeData:any) => {
        return new Promise((resolve, reject) => {
            request(
                {
                    url: url,
                    method: 'GET'
                },
                (err: any, res: any, body: any) => {
                    const $ = cheerio.load(body);
                    RecipeData.title = $('#contents_area').children('.view2_summary').children('h3').text();
                    RecipeData.author = $('#contents_area').children('.view2_pic').children('.user_info2').children('span').text();
                    
                    RecipeData.thumbnail = $('#contents_area').children('div.view2_pic').children('div.centeredcrop').html()!.match(/http([^>\"']+)/g)
                    const divs = $('.view_step').children('div');
                    divs.each((i:any, elem:any) => {
                        if(typeof(elem.attribs.id) === 'string') {
                            if(elem.attribs.id.substring(0,4) === 'step') {
                                RecipeData.content += '<p>' + $(elem).children('div:nth-child(1)').text() + '</p><br>'
                                RecipeData.content += $(elem).children('div:nth-child(2)').html() + '<br>'
                            }
                        }
                    })
                    resolve('complete')
                }
            )
            
        })
    }
    const doCrawling = async () => {
        const RecipeData = {
            author : '',
            title : '',
            category : 0,
            content : '',
            needs : [],
            sauce : [],
            source : url,
            thumbnail : '',
            view : 0,
            like : 0,
            hate : 0,
            idx : 0,
        }

        db.collection('autoIncrement').where('field', '==', 'board')
            .get().then((data: any) => {
                data.forEach((doc: any) => {
                    RecipeData.idx = doc.data().count
                })
            })
            .then(async () => {
                await CrawlingSync(RecipeData);
            })
            .then(() => {
                db.collection('board').add(RecipeData)
                    .then((res) => {
                        console.log('complete, ', res);
                    })
                    .catch((err) => {
                        console.error(err);
                    })
            })
            .then(() => {
                db.collection('autoIncrement').doc('board')
                    .update({ count: firebase.firestore.FieldValue.increment(1) })
            })
            .catch((err) => {
                console.error(err);
            })
            // db.collection('board').add()
    }

    return (
        <>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="url"
                label="url"
                type="text"
                id="url"
                autoComplete="current-password"
                onChange={(e) => setURL(e.target.value)}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={doCrawling}
            >
                크롤링
          </Button>


        </>
    )
}
export default Crawling;