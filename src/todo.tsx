import { useState } from 'react';
import './App.css';
import React from 'react';

function Todo(){
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
    e.preventDefault();
    //eで取ってきた値をsetInputValueに渡す
    setInputText(e.target.value);
};

const handleSubmit=(e:{ preventDefault: () => void })=>{
    //リロード阻止
    e.preventDefault();

    if (!inputText) {
        return;
    }
    //新しいTodoを作成
    const newTodo: Todo ={//事前に設定した型の参照
    inputValue:inputText,
    id: todos.length,//todos[]の長さ
    checked: false //チェック
};
    //作成した物をtodosに追加
    setTodos([newTodo, ...todos]);

    //再レンダリング
    setInputText(inputText);
    };


//編集
const handleEdit=(id:Number,inputValue:string)=>{
    const newTodos=todos.map((todo)=>{
        if(todo.id===id){
            todo.inputValue=inputValue;
        }
        return todo;
    });
    setTodos(newTodos);
};

//チェックボックス
const handleChecked=(id:Number, checked:boolean)=>{
    const newTodos=todos.map((todo)=>{
        if(todo.id===id){
            todo.checked = !checked;
        };
        return todo;
})
setTodos(newTodos);
};

//消すやつ
const handleDelete =(id:number)=>{
    const newTodos = todos.filter((todo)=> todo.id===id);//filter tureの時だけ返す
    
    setTodos(newTodos);
};





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
                {/* todosの中身をmapで1つずつ取り出してtodoに渡す */}
                {todos.map((todo)=>(
                    <li key={todo.id}>
                    <input type="text" onChange={(e)=>{handleEdit(todo.id,e.target.value)}} className='inputText' value={todo.inputValue} disabled ={todo.checked}/>
                    <input type="checkbox" onChange={(e)=>{handleChecked(todo.id,todo.checked)}} className='inputText' />
                    <button onClick={()=> handleDelete(todo.id)}>消</button>
                    </li>
                ))}
            </ul>
            </div>
        </div>
        );
};
    export default Todo;



