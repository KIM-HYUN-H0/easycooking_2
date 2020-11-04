import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { db } from '../../config';
import request from 'request';
import cheerio from 'cheerio';
import firebase from 'firebase';

const Crawling = () => {
    const [url, setURL] = useState(0);
    const CrawlingSync = (RecipeData: any, urlA:number) => {
        return new Promise((resolve, reject) => {
            request(
                {
                    url: `https://www.10000recipe.com/recipe/${urlA}`,
                    method: 'GET'
                },
                (err: any, res: any, body: any) => {
                    const $ = cheerio.load(body);
                    RecipeData.title = $('#contents_area').children('.view2_summary').children('h3').text();
                    if (RecipeData.title !== '') {
                        RecipeData.author = $('#contents_area').children('.view2_pic').children('.user_info2').children('span').text();
                        RecipeData.thumbnail = $('#contents_area').children('div.view2_pic').children('div.centeredcrop').html()!.match(/http([^>\"']+)/g)
                        const sauceList = $('#divConfirmedMaterialArea');
                        let needsGet = [];
                        for (let i = 1; i <= sauceList.children('ul').length; i++) {
                            for (let j = 1; j <= sauceList.children(`ul:nth-child(${i})`).children('a').length; j++) {
                                const abc = sauceList.children(`ul:nth-child(${i})`).children(`a:nth-child(${j + 1})`).children('li').first().contents()[0].data;
                                needsGet.push(abc);
                            }
                        }
                        RecipeData.needs = needsGet;
                        const divs = $('.view_step').children('div');
                        divs.each((i: any, elem: any) => {
                            if (typeof (elem.attribs.id) === 'string') {
                                if (elem.attribs.id.substring(0, 4) === 'step') {
                                    RecipeData.content += '<p>' + $(elem).children('div:nth-child(1)').text() + '</p><br>'
                                    RecipeData.content += $(elem).children('div:nth-child(2)').html() + '<br>'
                                }
                            }
                        })
                        resolve('complete')
                    }
                    else {
                        reject('no URL');
                    }

                }
            )

        })
    }
    const doCrawlingWrapper = () => {
        let i = url;
        let haha = setInterval(() => {
            if(i >= url + 100) {
                clearInterval(haha);
            }
            else {
                doCrawling(i);
                i++;
            }
        }, 5000)
        console.log('end')
    }
    const doCrawling = async (i:number) => {
        const RecipeData = {
            author: '',
            title: '',
            category: 0,
            content: '',
            needs: [],
            sauce: [],
            source: `https://www.10000recipe.com/recipe/${i}`,
            thumbnail: '',
            view: 0,
            like: 0,
            hate: 0,
            idx: 0,
            date: firebase.firestore.FieldValue.serverTimestamp()
        }

        db.collection('autoIncrement').where('field', '==', 'board')
            .get().then((data: any) => {
                data.forEach((doc: any) => {
                    RecipeData.idx = doc.data().count
                })
            })
            .then(async () => {
                await CrawlingSync(RecipeData, i)
                    .catch(err => {
                        console.error(err);
                        throw new Error('no URL');
                    })
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
                onChange={(e) => setURL(Number(e.target.value))}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={doCrawlingWrapper}
            >
                크롤링
          </Button>


        </>
    )
}
export default Crawling;