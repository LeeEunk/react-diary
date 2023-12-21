import React, { useState, useEffect, useMemo } from "react";

const CounterA = React.memo(({count}) => {
    useEffect(()=>{
        console.log(`CounterA Update - count : ${count}`)
    })
    return <div>{count}</div>
});
const CounterB = ({obj}) => {
    useEffect(()=> {
        console.log(`CounterB Update - count : ${obj.count}`)
    })
    return <div>{obj.count}</div> 
};

const areEqual = (prevProps, nextProps) => {
    return prevProps.obj.count === nextProps.obj.count;
    //return true // 이전 프롭스 현재 프롭스가 같다 -> 리렌더링을 일으키지 않게된다.
    //return false // 이전과 현재가 다르다 -> 리렌더링을 일으킨다.
}
const MemoizedCounterB = React.memo(CounterB, areEqual);

// const Textview = React.memo(({text}) => {
//     useEffect(()=> {
//         console.log(`Udate :: Text : ${text}`);
//     })
//     return <div>{text}</div>
// });
// const Countview = React.memo( ({count}) => {
//     useEffect(()=> {
//         console.log(`Udate :: Count : ${count}`);
//     })
//     return <div>{count}</div>
// });

const OptimizeTest = () => {

    // const [count, setCount] = useState(1);
    // const [text, setText] = useState("");

    const [count, setCount] = useState(1);
    const [obj, setObj] = useState({
        count : 1
    })

    return <div style={{padding:50}}>
        {/* <div>
            <h2>count</h2>
            <Countview count={count}/>
            <button onClick={()=> setCount(count +1)}>+</button>
        </div>
        <div>
            <h2>text</h2>
            <Textview text={text}/>
            <input value={text} onChange={(e)=> setText(e.target.value)}></input>
        </div> */}

        <div>
            <h2>Counter A</h2>
            <CounterA count={count}/>
            <button onClick={()=> setCount(count)}>A Button</button>
        </div>
        <div>
            <h2>Counter B</h2>
            <MemoizedCounterB obj={obj}/>
            <button onClick={()=> setObj({
                count: obj.count
            })}>B Button</button>
        </div>
    </div>
}

export default OptimizeTest;