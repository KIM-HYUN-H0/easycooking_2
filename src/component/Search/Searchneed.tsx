import React, { useEffect, useState } from "react";
import { db } from "../../config";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const Searchneed = () => {
  const [need, setNeed]: any = useState([]);
  const [needList, setNeedList]: any = useState([]);

  useEffect(() => {
    db.collection("needs")
      .doc("needs")
      .get()
      .then((needs: any) => {
        setNeedList(needs.data().need);
      });
  }, []);

  const test = () => {
    db.collection("board")
      .where("needs", "array-contains", need)
      .get()
      .then((data: any) => {
        data.forEach((doc: any) => {
          console.log(doc.data());
        });
      });
  };

  const needsChange = (e: any) => {
    console.log(e.target.value);
  };

  console.log(needList);

  return (
    <>
      {needList.length > 0
        ? needList.map((needs: any) => {
            return (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={true}
                    onChange={(e) => needsChange(e)}
                    name={needs}
                    color="primary"
                  />
                }
                label={needs}
              />
            );
          })
        : null}
      <Button onClick={test}>테스트</Button>
    </>
  );
};
export default Searchneed;
