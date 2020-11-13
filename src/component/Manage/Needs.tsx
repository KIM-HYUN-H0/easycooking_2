import React, { useEffect } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const Needs = (props: any) => {
    const { list } = props;

    const handleChange = () => {
        console.log('zz')
    }
    return (
        <>
            {list.length > 0 ?
                list.map((data: any) => {
                    return (
                        <>
                            <FormControlLabel
                                control={<Checkbox defaultChecked onChange={handleChange} name={data} />}
                                label={data}
                            />
                        </>
                    )
                })
                : null}
        </>
    )
}

export default Needs;