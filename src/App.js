import React, {useEffect} from "react";
import api from './services/api'

import "./styles.css";
import { useState } from "react";

function App() {
  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {
      const data = { 
        id: "123",
        url: "https://github.com/josepholiveira",
        title: "Desafio ReactJS",
        techs: ["React", "Node.js"],   
      }

      api.post('/repositories', data).then((rep)=>{
        setRepositories([...repositories, rep.data]);
      })
  }

  async function handleRemoveRepository(id) {
        api.delete(`repositories/${id}`).then(()=>{
       
          const repoNews =  repositories.filter(repo => repo.id != id)

          setRepositories(repoNews);
          
        })
  }

  useEffect(()=>{
    api.get('repositories').then((rep)=>{
          setRepositories(rep.data);
      })
  },[])

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(rep => (
            <li>
                
              {rep.title}
              <button onClick={() => handleRemoveRepository(rep.id)}>
                Remover
              </button>
          </li>
        ))}
  
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
