async function fetchUrls() {
  const keyword = document.getElementById('keyword').value;
  const response = await fetch('/get-urls', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ keyword })
  });
  const data = await response.json();
  if (response.ok) {
    displayUrls(data.urls);
  } else {
    alert(data.error);
  }
}

function displayUrls(urls) {
  const urlList = document.getElementById('urlList');
  urlList.innerHTML = '';
  urls.forEach(url => {
    const urlItem = document.createElement('div');
    urlItem.textContent = url;
    urlItem.className = 'url-item';
    urlItem.onclick = () => downloadContent(url);
    urlList.appendChild(urlItem);
  });
}

async function downloadContent(url) {
  const response = await fetch('/download-content', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ url })
  });
  const data = await response.json();
  if (response.ok) {
    saveContent(url, data.content);
  } else {
    alert(data.error);
  }
}

function saveContent(url, content) {
  const contentList = document.getElementById('contentList');
  const contentKey = btoa(url);
  localStorage.setItem(contentKey, content);
  const contentItem = document.createElement('div');
  contentItem.textContent = url;
  contentItem.className = 'content-item';
  contentItem.onclick = () => displayContent(contentKey);
  contentList.appendChild(contentItem);
}

function displayContent(contentKey) {
  const content = localStorage.getItem(contentKey);
  document.getElementById('contentDisplay').textContent = content;
}
