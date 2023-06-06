import { FormEvent, useState } from 'react';
import './App.css';
import React from 'react';


function Todo() {
    const[inputText,setInputText]=useState("");
    //<Todo[]>　ここの配列にはTodoで指定した型、プロパティしか入らないようになる
    const [todos,setTodos]=useState<Todo[]>([]);

    type Todo={
    inputValue:string;
    id:number;
    checked:boolean;
    };
//型　クイックフィックスで自動補完
const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    //eで取ってきた値をsetInputValueに渡す
    setInputText(e.target.value);
};

const handleSubmit=(e: FormEvent<HTMLFormElement>)=>{
    //リロード阻止
    e.preventDefault();

    //新しいTodoを作成
    const newTodo: Todo ={//事前に設定した型の参照
    inputValue:inputText,
    id: todos.length,//todos[]の長さ
    checked: false //チェック
};
    //作成した物をtodosに追加
    setTodos([newTodo, ...todos]);
    //投稿後空  に戻す
    setInputText("");
    };
const handleEdit=(id:Number,inputValue:string)=>{
    const newTodos=todos.map((task)=>{
        //inputでとってきたidがidと同じだった場合
        if(task.id===id){
            task.inputValue=inputValue;
        }
        return task;
    });
    setTodos(newTodos);
};
const handleChecked=(id:Number, checked:boolean)=>{
    const newTodos=todos.map((task)=>{
        if(task.id=== id){
            task.checked= !checked;
        }
        return task;
})};
    return (
    <div className="to">
        <div>
            <h2>Todo list TS</h2>   
                {/* 値をeに格納してhandleChangeにに渡す */}
            <form onSubmit={(e)=>{handleSubmit(e)}} >
                <input type="text" onChange={(e)=>{handleChange(e)}} className='inputText' />
                    {/* ボタンが押されたら */}
                <input type="submit" value="追加" className='submitButton' />
            </form>
            <ul>
                {/* todosの中身をmapで1つずつ取り出してtaskに渡す */}
                {todos.map((task)=>(
                    // newTodo のinputValue
                    <li key={task.id}>
                        <input type="text" onChange={(e)=>{handleEdit(task.id,e.target.value)}} 
                        className='inputText'
                        value={task.inputValue}
                        disabled ={task.checked}
                        />
                    <input type="checkbox" onChange={()=>{handleChecked(task.id,task.checked)}} 
                        className='inputText'
                        value={task.inputValue}/>
                    </li>
                ))}
            </ul>
            </div>
        </div>
    );
};
    export default Todo;