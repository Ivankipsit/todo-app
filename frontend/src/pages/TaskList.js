import React, { useEffect, useState } from 'react';
import { TASKS } from '../appConfig/urlConfig';
import axios from 'axios';

export default function TaskList() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(TASKS)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return <div>{JSON.stringify(data)}</div>;
}
