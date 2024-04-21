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

  function interpretar_entrada() {
    var entrada = editorRef.current.getValue();
    fetch('http://localhost:4000/interpretar_entrada', {
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

  function reporte_errores() {
    fetch('http://localhost:4000/generar_reporte_errores', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ entrada: editorRef.current.getValue() }),
    })
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'ReporteErrores.html';
        a.click();
      })
      .catch((error) => {
        alert("ERROR")
        console.error('Error:', error);
      });
  }

  function reporte_tabla() {
    fetch('http://localhost:4000/generar_reporte_tablas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ entrada: editorRef.current.getValue() }),
    })
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'ReporteTablas.html';
        a.click();
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
            <input type="button" value="Ejecutar" class="btn" onClick={interpretar_entrada} />
          </div>
          <div class="rowBar">
          <div class="dropdown">
          <button class="btn dropdown-btn">Reportes</button>
            <div class="dropdown-content">
              <a href="#" onClick={reporte_errores}>Errores</a>
              <a href="#" onClick={reporte_tabla}>Tabla Simbolos</a>
              <a href="#">Arbol AST</a>
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
              <Editor height="75vh" defaultLanguage="java" defaultValue="" theme="vs-dark" onMount={(editor) => handleEditorDidMount(editor, "editor")} />
            </div>
            <div class="col">
              <p>Consola</p>
              <Editor height="75vh" defaultLanguage="cpp" defaultValue="" theme="vs-dark" options={{ readOnly: true }} onMount={(editor) => handleEditorDidMount(editor, "consola")} />
            </div>
          </div>
        </div>
      </div>
  
    </div>
  );
}

export default App;