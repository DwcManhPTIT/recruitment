/* eslint-disable react-hooks/exhaustive-deps */
import { Card } from "antd";
import { getCookie } from "../../helpers/cookie";
import { useEffect, useState } from "react";
import { getListCV } from "../../services/cvService";
import { Pie } from '@ant-design/plots';

function CVStatistic() {
  const idCompany = getCookie("id");
  const [data, setData] = useState();

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getListCV(idCompany);
      if (response) {
        let obj = {
          total: 0,
          statusTrue: 0,
          statusFalse: 0,
        };
        obj.total = response.length;
        response.forEach((item) => {
          item.statusRead ? obj.statusTrue++ : obj.statusFalse++;
        });

        let dataOject = {
          Tổng_CV: obj.total,
          CV_đã_đọc: obj.statusTrue,
          CV_chưa_đọc: obj.statusFalse
        };
        setData(dataOject);
        console.log(data);



      }
    };
    fetchApi();
  }, []);

  // let dataOject = {
  //   Tổng_CV: obj.total,
  //   CV_bật: 15,
  //   CV_tắt: 5
  // };

  let dataArray = [];

  for (let key in data) {
    dataArray.push({
      type: key,
      value: data[key]
    });
  }

  console.log(dataArray);

  const config = {

    data: dataArray,
    angleField: "value",
    colorField: "type",

  };


  return (
    <>
      {data && (
        <Card title="Thống kê CV" className="mb-20" size="large">
          <Pie {...config} />
          <div>
            Số lượng CV: <strong>{data.Tổng_CV}</strong>
          </div>
          <div>
            CV chưa đọc: <strong>{data.CV_đã_đọc}</strong>
          </div>
          <div>
            CV đã đọc: <strong>{data.CV_chưa_đọc}</strong>
          </div>
        </Card >
      )
      }
    </>
  );
}

export default CVStatistic;
