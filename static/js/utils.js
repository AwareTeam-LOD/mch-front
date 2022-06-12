export async function readTextFile(file){
    const response = await fetch(file);
    if(response.status === 404){
      return `<div class="card card-style bg-red-dark ms-0 me-0 rounded-0">
      <div class="content">
      <p class="mb-n1 color-white opacity-30 font-600">Что-то пошло не так..</p>
      <h1 class="color-white">Не загрузилось</h1>
      <p class="color-white opacity-60">
      Не удалось загрузить модуль ` + file + ` — его не существует. Это очень странно, что Вы видите подобное! Попробуйте еще раз с начала.
      </p>
      <a onclick="getHome()" class="btn btn-border btn-m btn-full mb-3 rounded-sm text-uppercase font-700 border-black color-green-dark bg-theme">Запустить с начала</a>
      </div>
      </div>
      <script>
          function getHome(){
            var parentUrl = encodeURIComponent(window.location.href),
            loginUrl = window.location.origin+"/";

            window.location.href = loginUrl;
          }
      </script>`;
    }else if(response.status === 500 || response.status === 502){
      return `<br>Sorry, this servise is not available right now.<br>Error code: 500. This server is not configured for error reporting, nowhere to report. <hr> Powered by Aram's Vanila JS framework.`;
    }else{
      return response.text();
    }
}

