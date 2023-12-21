import "./App.css";
import React, {useState, useRef, useEffect, useMemo, useCallback} from "react";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import OptimizeTest from "./OptimizeTest";
//import Lifecycle from "./Lifecycle";

//https://jsonplaceholder.typicode.com/comments

// const dummyList = [
//   {
//     id:1,
//     author:"이은경",
//     content: "hi 1",
//     emotion: 5,
//     created_date: new Date().getTime()
//   },
//   {
//     id:2,
//     author:"이소임",
//     content: "hi 2",
//     emotion: 2,
//     created_date: new Date().getTime()
//   },
//   {
//     id:3,
//     author:"이정준",
//     content: "hi 3",
//     emotion: 3,
//     created_date: new Date().getTime()
//   },
// ]

function App() {

  const getData = async() => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/comments`).then((res)=> res.json());
    console.log(res);
  

  const initData = res.slice(0,20).map((it)=> {
    return {
      author: it.email,
      content: it.body,
      emotion: Math.floor(Math.random() * 5)+1,
      created_date: new Date().getTime(),
      id: dataId.current++,
    };
  });

  setData(initData);
};

  useEffect(()=> {
    getData();
  }, []);

  const [data, setData] = useState([]);
  const dataId = useRef(0);

  const onCreate = useCallback((author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id : dataId.current,
    };
    dataId.current += 1;
    setData([newItem, ...data]);
  },[]);

  const onRemove = (targetId) => {
    // console.log(`${targetId}가 삭제되었습니다.`);
    const newDiaryList = data.filter((it) => it.id !== targetId);
    console.log(newDiaryList);
    setData(newDiaryList);
  };

  const onEdit = (targetId, newContent) => {
    setData(
      data.map((it)=> it.id === targetId ? {...it, content:newContent} : it)
    );
  };

  const getDiaryAnalysis = useMemo(() => {
    // console.log("일기 분석 시작");

    const goodCount = data.filter((it)=> it.emotion >=3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;
    return {goodCount, badCount, goodRatio};
  }, [data.length]);

  const {goodCount, badCount, goodRatio} = getDiaryAnalysis;
  return (
    <div className="App">
      {/* <Lifecycle/> */}
      <OptimizeTest/>
      <DiaryEditor onCreate={onCreate}/>
      <div>전체일기: {data.length}</div>
      <div>기분 좋은 일기 개수 : {goodCount}</div>
      <div>기분 나쁜 일기 개수 : {badCount}</div>
      <div>기분 좋은 일기 비율 : {goodRatio}</div>
      <DiaryList diaryList={data} onEdit={onEdit} onRemove={onRemove} />
    </div>
  );
}

export default App;
