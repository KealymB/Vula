let formdata = new FormData();
    formdata.append('_username', 'USERNAME')
    formdata.append('_password', 'PASSWORD')

    CookieManager.clearAll()
      .then((res) => {
        console.log('CookieManager.clearAll =>', res);
      });

    function makeRequest(path, params) {
      fetch(path, {
        method: 'POST',
        headers: {
          'User-Agent': 'react-native',
          'Connection': 'keep-alive'
        },
        body: params
      }).then((response) => response.headers['map']['set-cookie']).then(cookie => {
        storage.setItem('cookie', JSON.stringify(cookie))
      }).catch(err => {
        console.log(err)
      })


    }

    async function get() {
      let a = await makeRequest("https://vula.uct.ac.za/direct/session/new", formdata)
      let cookie = await storage.getItem('cookie')
      alert('Cookie: ' + cookie)
    }

    get()
  }
