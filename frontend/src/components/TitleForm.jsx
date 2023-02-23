import React, { useEffect, useState } from "react";
import Input from "./Input";

function TitleForm({onSearchTitle, searchResult}) {
  const [title, setTitle] = useState("");
  const handleChange = (e) => setTitle(e.target.value)

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title) return;

    onSearchTitle(title);
  };
  var response = ""
  if(searchResult.movie != null && searchResult.show != null){
    response = `O título ${searchResult.movie.title} está presente em ambas as 
    bases de dados com o id ${searchResult.movie._id} no MovieDB e com o id ${searchResult.show._id} no ShowDB.`;
  }else if(searchResult.movie != null){
    response = `O título ${searchResult.movie.title} está presente apenas na base de dados 
    MovieDB com o id ${searchResult.movie._id}.`;
  }else if(searchResult.show){
    response = `O título ${searchResult.show.title} está presente apenas na base de dados 
    ShowDB com o id ${searchResult.show._id}.`;
  }else{
    response = `O título ${title} não está presente em nenhum banco de dados.`;
  }

  useEffect(()=>onSearchTitle(title), [title]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input
        aria-label="Pesquisa no Banco"
        onChange={handleChange}
        placeholder="Pesquise um título"
        type="text"
        />
      </form>
      <h3>
        {response}
      </h3>
    </div>
  )
}

export default TitleForm;