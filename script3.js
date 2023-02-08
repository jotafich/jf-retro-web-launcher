async function generateResponse() {
    const input = document.getElementById("input").value;
    const output = document.getElementById("output");
    const response = await fetch("https://api.openai.com/v1/engines/text-davinci-002/completions", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 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"
      },
      method: "POST",
      body: JSON.stringify({
        prompt: input,
        max_tokens: 100,
        temperature: 0.5,
      })
    });
    const json = await response.json();
    const text = json.choices[0].text;
    let i = 0;
    output.innerHTML = `<p style="text-align: center;">Yo: ${input}</p><p>IA: </p>`;
    const interval = setInterval(() => {
      const answerEl = document.querySelector("#output p:last-of-type");
      answerEl.innerHTML += text[i];
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        const button = document.createElement("button");
        button.innerHTML = "Borrar";
        button.style.display = "block";
        button.style.margin = "0 auto";
        button.onclick = clearResponse;
        output.appendChild(button);
      }
    }, 50);
  }

function clearResponse() {
  document.getElementById("output").innerHTML = "";
  document.getElementById("input").value = "";
}
