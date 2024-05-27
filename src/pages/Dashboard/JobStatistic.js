/* eslint-disable react-hooks/exhaustive-deps */
import { Card } from "antd";
import { getCookie } from "../../helpers/cookie";
import { useEffect, useState } from "react";
import { getListJob } from "../../services/jobService";
import { Pie } from '@ant-design/plots';


function JobStatistic() {
  const idCompany = getCookie("id");
  const [data, setData] = useState();

  const JOB_TOTAL = 'Tổng Job';
  const JOB_ACTIVE = 'Job bật';
  const JOB_INACTIVE = 'Job tắt';


  useEffect(() => {
    const fetchApi = async () => {
      const response = await getListJob(idCompany);
      if (response) {
        let obj = {
          total: 0,
          statusTrue: 0,
          statusFalse: 0,
        };
        obj.total = response.length;
        response.forEach((item) => {
          item.status ? obj.statusTrue++ : obj.statusFalse++;
        });
        let dataObject = {
          [JOB_TOTAL]: obj.total,
          [JOB_ACTIVE]: obj.statusTrue,
          [JOB_INACTIVE]: obj.statusFalse
        };
        setData(dataObject);
      }
    };
    fetchApi();
  }, []);
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
        <Card title="Thống kê Job" className="mb-20" size="big">
          <Pie {...config} />
          <div>
            Số lượng job: <strong>{data[JOB_TOTAL]}</strong>
          </div>
          <div>
            Job đang bật: <strong>{data[JOB_ACTIVE]}</strong>
          </div>
          <div>
            Job đang tắt: <strong>{data[JOB_INACTIVE]}</strong>
          </div>
        </Card>
      )}
    </>
  );
}

export default JobStatistic;
