import { useEffect, useState, useRef } from "react"
import './App.css';
import Editor from '@monaco-editor/react';

function App() {
  const editorRef = useRef(null);
  const consolaRef = useRef(null);

  function handleEditorDidMount(editor, id) {
    if (id === "editor") {
      editorRef.current = editor;
    } else if (id === "consola") {
      consolaRef.current = editor;
    }
  }


  function interpretar() {
    var entrada = editorRef.current.getValue();
    fetch('http://localhost:4000/interpretar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ entrada: entrada }),
    })
      .then(response => response.json())
      .then(data => {
        consolaRef.current.setValue(data.Respuesta);
      })
      .catch((error) => {
        alert("ERROR")
        console.error('Error:', error);
      });
  }

  const CargarArchivo = (event) => {
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = function (event) {
      var contents = event.target.result;
      editorRef.current.setValue(contents);
    };
    reader.readAsText(file);
  }


  return (
    <div className="App">

      <div>
        <nav class="navbar">
          <div class="rowBar">
          <h1 class="navbar-title">OLC PROYECTO 2</h1>
          </div>
          <div class="rowBar">
            <input type="file" id="file" class="btn" onChange={CargarArchivo} />
          </div>
          <div class="rowBar">
            <input type="button" value="Ejecutar" class="btn" onClick={interpretar} />
          </div>
          <div class="rowBar">
          <div class="dropdown">
          <button class="btn dropdown-btn">Reportes</button>
            <div class="dropdown-content">
                <a href="#">Opción 1</a>
                <a href="#">Opción 2</a>
                <a href="#">Opción 3</a>
            </div>
            </div>
          </div>
        </nav>
      </div>

      <div>
        <h1>CompiScript+</h1>
      </div>

      <div>
        <div class="container" >
          <div class="row">
            <div class="col">
              <p>Entrada</p>
              <Editor height="90vh" defaultLanguage="java" defaultValue="" theme="vs-dark" onMount={(editor) => handleEditorDidMount(editor, "editor")} />
            </div>
            <div class="col">
              <p>Consola</p>
              <Editor height="90vh" defaultLanguage="cpp" defaultValue="" theme="vs-dark" options={{ readOnly: true }} onMount={(editor) => handleEditorDidMount(editor, "consola")} />
            </div>
          </div>
        </div>
      </div>
  
    </div>
  );
}

export default App;