import { useState } from "react";
import ContextValue from "../contextValue/ContextValue.jsx";
import "./ContextItem.css";

function ContextItem() {
  const [selectOption, setSelectOpition] = useState("");
  const [textarea, setTextarea] = useState("");
  const [number, setNumber] = useState('');
  const data = localStorage.getItem("transiction");
  const [list, setList] = useState(data ? JSON.parse(data) : []);

  function AddTable() {
    if (number.trim() !== "" && textarea.trim() !== "" && selectOption !== "") {
      const newList = {
        value: parseFloat(number),
        description: textarea,
        selectOption,
      };
      const upList = [...list, newList];
      setList(upList);
      localStorage.setItem("transiction", JSON.stringify(upList));

      setNumber("");
      setTextarea("");
      setSelectOpition("");
    } else {
      alert("Preencha todos os campos e selecione um tipo!");
    }
  }

  function deleteTransiction(index) {
      const deleteList = list.filter((_, i) => i !== index);
      setList(deleteList);
      localStorage.setItem("transiction", JSON.stringify(deleteList))
  }

  return (
    <div className="container">
      <div className="container-itens">
        <div className="row">
          <p className="size">Entrada</p>
          <span className="bold">
            R${" "}
            {list
              .filter((item) => item.selectOption === "entrada")
              .reduce((total, atual) => total + atual.value, 0)
              .toFixed(2)}
          </span>
        </div>

        <div className="row">
          <p className="size">Saidas</p>
          <span className="bold">
            R${" "}
            {list
              .filter((item) => item.selectOption === "saida")
              .reduce((total, atual) => total + atual.value, 0)
              .toFixed(2)}
          </span>
        </div>

        <div className="row">
          <p className="size">Total</p>
          <span className="bold">
            R${" "}
            {list
              .reduce(
                (total, atual) =>
                  atual.selectOption === "entrada"
                    ? total + atual.value
                    : total - atual.value,
                0
              )
              .toFixed(2)}
          </span>
        </div>
      </div>
      <div className="container-form">
        <div className="back-form">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="column">
              <label htmlFor="input-description">Descrição</label>
              <textarea
                name="textarea"
                id="input-description"
                maxLength="10"
                value={textarea}
                onChange={(e) => setTextarea(e.target.value)}
                style={{ resize: "none", height: "30px" }}
              ></textarea>
            </div>

            <div className="column">
              <label htmlFor="input-number">Valor</label>
              <input
                id="input-number"
                type="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>

            <div className="row-check">
              <input
                type="radio"
                name="entrada"
                value="entrada"
                checked={selectOption === "entrada"}
                onChange={(e) => setSelectOpition(e.target.value)}
              />
              <label htmlFor="input-description" className="p">
                Entrada
              </label>
              <input
                type="radio"
                name="saida"
                value="saida"
                checked={selectOption === "saida"}
                onChange={(e) => setSelectOpition(e.target.value)}
              />
              <label htmlFor="input-description">Saida</label>
            </div>

            <div className="btn">
              <button type="submit" onClick={() => AddTable()}>
                Adicionar
              </button>
            </div>
          </form>
        </div>
        {list.length > 0 && <ContextValue list={list} deleteTransiction={deleteTransiction} />}
      </div>
    </div>
  );
}

export default ContextItem;
