const userList = document.querySelector('.user-list');
const postInfo = document.querySelector('.post-info');

function makeElement(tag, attr_n, attr_v, content, id) {
  let output = document.createElement(tag);
  (!!attr_n) && output.setAttribute(attr_n, attr_v);
  (!!id) && output.setAttribute('id', id);
  output.textContent = content;
  return output;
}

fetch('https://jsonplaceholder.typicode.com/users')
  .then(resp => resp.json())
  .then(data => {
    for (let el of data) {
      const a = makeElement('a', '', '', `${el.name} / ${el.email}`, `link-${el.id}`);
      const li = makeElement('li', '', '', '', `user-${el.id}`);
      userList.append(li);
      userList.append(a);

      a.addEventListener('click', function () {
        const userId = this.id.split('-')[1];

        fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
          .then(resp1 => resp1.json())
          .then(data1 => {
            postInfo.innerHTML = '';
            for (let post of data1) {
              const titleElement = makeElement('p', '', '', `Title : ${post.title}`,'title');
              const bodyElement = makeElement('p', '', '', `Body : ${post.body}`, 'body');
              postInfo.append(titleElement);
              postInfo.append(bodyElement);
            }
          });
      });
    }
  });
