import { collection, doc, getDoc, setDoc, addDoc, getDocs, deleteDoc, where, query } from 'firebase/firestore';
import db from '../db.js';

//--------------------------------------------------------------------------
/**
 * Get TODOs
 */
export const getTodosModel = async () => {
  const dbRef = collection(db, 'todo');
  const docRef = await getDocs(dbRef);
  const data = docRef.docs.map(doc => ({id: doc.id, ...doc.data()}));
  return data;
}

//--------------------------------------------------------------------------
/**
 * Get TODO with ID
 * @param {*} todoId 
 */
export const getTodoWithIDModel = async (todoId) => {
  try {
    const docRef = await getDoc(doc(db, 'todo', todoId));
    const data = docRef.data();
    if (!data) return {
      data: null,
      error: null,
    }
    return {
      data: {
        id: todoId,
        ...data
      },
      error: null,
    };
  } catch(err) {
    console.log(err.message);
    return {
      error: 'An error occured',
    }
  }
}


//--------------------------------------------------------------------------
/**
 * Create a TODO
 * @param {*} newData
 */
export const createTodoModel = async (newData) => {
  try {
    const dbRef = collection(db, 'todo');
    const docRef = await addDoc(dbRef, newData);
    return {
      data: {
        id: docRef.id,
        ...newData
      },
      error: null
    };
  } catch(err) {
    console.log(err.message);
    return {
      error: 'An error occured',
    };
  }
}

//--------------------------------------------------------------------------
/**
 * Update a TODO
 * @param {*} todoId
 * @param {*} updateData
 */
export const updateTodoModel = async (todoId, updateData) => {
  try {
    const docRef = await getDoc(doc(db, 'todo', todoId));
    const data = docRef.data();
    if (!data) return {
      error: 'No data with that todoId',
    }
    await setDoc(doc(db, 'todo', todoId), updateData);
    return {
      data: {
        id: todoId,
        ...updateData
      },
      error: null,
    };
  } catch(err) {
    console.log(err.message);
    return {
      error: 'An error occured',
    }
  }
}

//--------------------------------------------------------------------------
/**
 * Delete a TODO
 * @param {*} todoId
 */
export const deleteTodoModel = async (todoId) => {
  try {
    const docRef = doc(db, 'todo', todoId);
    await deleteDoc(docRef);
    return {
      data: todoId,
      error: null,
    }
  } catch(err) {
    console.log(err.message);
    return {
      error: 'An error occured',
    }
  }
}

//--------------------------------------------------------------------------
/**
 * Complete a TODO
 * @param {*} todoId
 * @param {*} completed
 */
export const completeTodoModel = async (todoId, completed) => {
  try {
    const docRef = await getDoc(doc(db, 'todo', todoId));
    const data = docRef.data();
    if (!data) return {
      error: 'No data with that todoId',
    }
    await setDoc(doc(db, 'todo', todoId), {
      ...data,
      completed
    });
    return {
      data: {
        id: todoId,
        ...data,
        completed
      },
      error: null,
    };
  } catch(err) {
    console.log(err.message);
    return {
      error: 'An error occured',
    }
  }
}

//--------------------------------------------------------------------------
/**
 * Hide completed TODOs
 * @param {*} completed
 */
export const hideCompletedTodosModel = async (completed) => {
  try {
    const dbRef = collection(db, 'todo');
    let docRef;
    if (!completed) {
      const q = query(dbRef, where('completed', '==', false));
      docRef = await getDocs(q);
    } else {
      docRef = await getDocs(dbRef);
    }
    const data = docRef.docs.map(doc => ({id: doc.id, ...doc.data()}));
    return {
      data,
      error: null
    };
  } catch(err) {
    console.log(err.message);
    return {
      error: 'An error occured',
    }
  }
}

//--------------------------------------------------------------------------
