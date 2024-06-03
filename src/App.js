import "./App.css";
import { useState, useRef } from "react";

function App() {
  const language = ["HTML", "CSS", "JAVASCRIPT", "REACT"];
  const optionref = useRef();
  const [inputvalue, setInputvalue] = useState("");
  const [data, setData] = useState([]);
  const [selectlang, setSelectLang] = useState([]);
  const [activecard, setActivecard] = useState(null);

  const handletask = () => {
    const perform = optionref.current.value;
    const taskobj = {
      selectlang: selectlang,
      task: perform,
      action: inputvalue,
      timestamp: new Date().toLocaleString(),
    };
    setData([...data, taskobj]);
    setInputvalue("");
    setSelectLang([]);
    optionref.current.value = "To do";
  };

  const handleselectlang = (lang) => {
    if (selectlang.includes(lang)) {
      let filteredlang = selectlang.filter((item) => item !== lang);
      setSelectLang([...filteredlang]);
    } else {
      setSelectLang([...selectlang, lang]);
    }
  };

  const handledelete = (action) => {
    const filteredtasks = data.filter((item) => item.action !== action);
    setData([...filteredtasks]);
  };

  const handleDrop = (event, status) => {
    event.preventDefault();
    setData(
      data.map((item) =>
        item.action === activecard ? { ...item, task: status } : item
      )
    );
    setActivecard(null);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className="App">
      <div className="todo-container">
        <input
          value={inputvalue}
          type="text"
          placeholder="enter your task"
          className="taskinput"
          onChange={(e) => setInputvalue(e.target.value)}
        ></input>
        <div className="option-container">
          <div className="language-container">
            {language.map((item) => (
              <div
                key={item}
                className={
                  selectlang.includes(item) ? "select-language" : "language"
                }
                onClick={() => handleselectlang(item)}
              >
                {item}
              </div>
            ))}
          </div>
          <select className="selectoptions" ref={optionref}>
            <option value="To do">To do</option>
            <option value="Doing">Doing</option>
            <option value="Done">Done</option>
          </select>
          <button className="taskbutton" onClick={handletask}>
            + Add Task
          </button>
        </div>
      </div>
      <div className="task-main-container">
        <div className="task-container">
          <div
            className="tasktab"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, "To do")}
          >
            {data.length > 0 && <h2>🎯To do</h2>}
            {data.map((item) => {
              if (item.task === "To do") {
                return (
                  <div
                    key={item.action}
                    className="task-card"
                    draggable
                    onDragStart={() => setActivecard(item.action)}
                    onDragEnd={() => setActivecard(null)}
                  >
                    <p>{item.action}</p>
                    <div className="task-tab-content">
                      <div className="lang-container">
                        {item.selectlang.map((lng) => (
                          <div
                            key={lng}
                            className={`${lng.toLowerCase()} lang`}
                          >
                            {lng}
                          </div>
                        ))}
                      </div>
                      <div className="lang-container">
                        <div className="timestamp">{item.timestamp}</div>
                        <button
                          className="delete-button"
                          onClick={() => handledelete(item.action)}
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
          <div
            className="tasktab"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, "Doing")}
          >
            {data.length > 0 && <h2>🌟Doing</h2>}
            {data.map((item) => {
              if (item.task === "Doing") {
                return (
                  <div
                    key={item.action}
                    className="task-card"
                    draggable
                    onDragStart={() => setActivecard(item.action)}
                    onDragEnd={() => setActivecard(null)}
                  >
                    <p>{item.action}</p>
                    <div className="task-tab-content">
                      <div className="lang-container">
                        {item.selectlang.map((lng) => (
                          <div
                            key={lng}
                            className={`${lng.toLowerCase()} lang`}
                          >
                            {lng}
                          </div>
                        ))}
                      </div>
                      <div className="lang-container">
                        <div className="timestamp">{item.timestamp}</div>
                        <button
                          className="delete-button"
                          onClick={() => handledelete(item.action)}
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
          <div
            className="tasktab"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, "Done")}
          >
            {data.length > 0 && <h2>✅Done</h2>}
            {data.map((item) => {
              if (item.task === "Done") {
                return (
                  <div
                    key={item.action}
                    className="task-card"
                    draggable
                    onDragStart={() => setActivecard(item.action)}
                    onDragEnd={() => setActivecard(null)}
                  >
                    <p>{item.action}</p>
                    <div className="task-tab-content">
                      <div className="lang-container">
                        {item.selectlang.map((lng) => (
                          <div
                            key={lng}
                            className={`${lng.toLowerCase()} lang`}
                          >
                            {lng}
                          </div>
                        ))}
                      </div>
                      <div className="lang-container">
                        <div className="timestamp">{item.timestamp}</div>
                        <button
                          className="delete-button"
                          onClick={() => handledelete(item.action)}
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
