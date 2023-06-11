import React,{ useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, updateUser, deleteUser } from '../Redux/action';
import { RootState, User } from '../Redux/type';
import { fn } from './generic'; 


//this file is used for testing purpose to check why component is rendering multiple times
export let A =()=>{
    const users = useSelector((state: RootState) => state.users);
    const dispatch = useDispatch();
    // const [list,setList] = React.useState<any[]>([])
    // let a = (x:any)=>x
    // let filteredArray = (existingList:any[],users:any[])=>users.filter(item => {
    //     return !existingList.some(obj => obj.id === item.id);
    //   });
     console.log('a')
    useEffect(()=>{
        const fetch = async ()=>{

            let x =await fn({ method: 'get', url: 'https://localhost:7224/api/admin/getAll', data:null });   
            let {data} =x as any
            console.log('data',data)
            // setList(data)
            data.forEach((element:User) => dispatch(addUser(element as User)))
            // filteredArray(users,data).forEach((element:User) => dispatch(addUser(element as User)))
            // console.log('filtered',filteredArray(users,data))
            // setList(filteredArray(users,data))

        
         }
         fetch() 
    },[ ])
    return (
        <> 
        {users.length}
            <h1>a</h1> 
        </>
    )
}