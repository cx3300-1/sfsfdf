// Service Worker 文件 (sw.js)

// 缓存的版本号，当你更新了任何需要缓存的文件时，都需要更改这个版本号
const CACHE_VERSION = 'v1.4.7';
const CACHE_NAME = `ephone-cache-${CACHE_VERSION}`;

// 需要被缓存的文件的列表
// 我已经根据你的 HTML 文件，帮你把所有用到的外部 JS 和图片都列出来了
const URLS_TO_CACHE = [
  './index.html', // 缓存你的主页面
  'https://unpkg.com/dexie/dist/dexie.js',
  'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js',
  'https://phoebeboo.github.io/mewoooo/pp.js',
  'https://cdn.jsdelivr.net/npm/streamsaver@2.0.6/StreamSaver.min.js',
  'https://s3plus.meituan.net/opapisdk/op_ticket_885190757_1758510900942_qdqqd_djw0z2.jpeg', // 你的图标
  'https://s3plus.meituan.net/opapisdk/op_ticket_885190757_1756312261242_qdqqd_g0eriz.jpeg'  // 你的图标
];

// 1. 安装事件：当 Service Worker 首次被注册时触发
self.addEventListener('install', event => {
  console.log('Service Worker 正在安装...');
  // event.waitUntil 会等待一个 Promise 完成
  event.waitUntil(
    // 打开我们指定的缓存
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('缓存已打开，正在缓存核心文件...');
        // 将所有需要缓存的文件添加到缓存中
        return cache.addAll(URLS_TO_CACHE);
      })
      .then(() => {
        console.log('所有核心文件已缓存成功！');
        // 强制新的 Service Worker 立即激活
        return self.skipWaiting();
      })
  );
});

// 2. 激活事件：当 Service Worker 被激活时触发 (通常在旧的 SW 关闭后)
self.addEventListener('activate', event => {
  console.log('Service Worker 正在激活...');
  event.waitUntil(
    // 获取所有的缓存名称
    caches.keys().then(cacheNames => {
      return Promise.all(
        // 遍历所有缓存
        cacheNames.map(cacheName => {
          // 如果缓存的名称不是当前我们定义的这个，说明它是旧的缓存
          if (cacheName !== CACHE_NAME) {
            console.log('正在删除旧的缓存:', cacheName);
            // 就把它删除掉
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
        console.log('Service Worker 已激活并准备好处理请求！');
        // 让 Service Worker 立即控制页面
        return self.clients.claim();
    })
  );
});

// 3. 拦截网络请求事件：页面上的所有网络请求都会先经过这里
self.addEventListener('fetch', event => {
  // 我们只对 GET 请求进行缓存处理
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    // 首先，尝试在缓存中查找这个请求
    caches.match(event.request)
      .then(cachedResponse => {
        // 如果在缓存中找到了匹配的响应
        if (cachedResponse) {
          // 就直接返回缓存的版本，这样就实现了离线访问
          // console.log('从缓存中返回:', event.request.url);
          return cachedResponse;
        }
        
        // 如果缓存中没有找到，就继续执行原始的网络请求
        // console.log('从网络请求:', event.request.url);
        return fetch(event.request);
      })
  );
});
