import React, { useState } from "react";
import { sendHtml } from "./../api/endpoints";

const Form = () => {
  const [isFetching, setIsFetching] = useState(false);

  const [text, setText] = useState("<h1>Test</h1>");

  const onClick = () => {
    setIsFetching(true);

    sendHtml(text).then((res) => {
      const url = window.URL.createObjectURL(
        new Blob([new Uint8Array(res.data.data)])
      );

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "yourcoolpdf.pdf");
      document.body.appendChild(link);
      link.click();

      setIsFetching(false);
      setText("");
    });
  };

  return (
    <div className="App">
      <div>
        <textarea
          id="text"
          type="text"
          placeholder="HTML"
          rows="20"
          cols="50"
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={isFetching}
        />
      </div>

      <div>
        <button onClick={onClick} disabled={isFetching}>
          Convert to PDF
        </button>
      </div>
    </div>
  );
};

export default Form;
