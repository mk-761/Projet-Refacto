export async function mockTodosAPI(page, todosMock) {

  await page.route('/api/greeting', route => {

    route.fulfill({

      status: 200,

      contentType: 'application/json',

      body: JSON.stringify({

        greeting: 'Hello world!',

      }),

    });

  });

 

  let todos = [...todosMock];

 

  await page.route('/api/items', async route => {

    const method = route.request().method();

 

    // GET /api/items

    if (method === 'GET') {

      return route.fulfill({ json: todos });

    }

 

    // POST /api/items

    if (method === 'POST') {

      const data = JSON.parse(route.request().postData());

      const item = { id: Date.now(), ...data };

      todos.push(item);

      return route.fulfill({ json: item });

    }

  });

 

  await page.route('/api/items/*', async route => {

    const method = route.request().method();

    const id = Number(route.request().url().split('/').pop());

 

    // PUT /api/items/:id

    if (method === 'PUT') {

      const data = JSON.parse(route.request().postData());

      const todo = todos.find(t => t.id === id);

      const item = { ...todo, ...data };

      return route.fulfill({ json: item });

    }

 

    // DELETE /api/items/:id

    if (method === 'DELETE') {

      todos = todos.filter(t => t.id !== id);

      return route.fulfill({ status: 200 });

    }

  });

}