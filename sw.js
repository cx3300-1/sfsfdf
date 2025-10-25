// Service Worker 文件 (sw.js)

// 👇 *** 关键：每次更新，都必须修改这个版本号 ***
const CACHE_VERSION = 'v1.5'; // 比如从 v1.1 改成 v1.2
const CACHE_NAME = `ephone-cache-${CACHE_VERSION}`;

// 需要被缓存的文件的列表
const URLS_TO_CACHE = [
  './index.html', 
  './style.css',
  './script.js',
  'https://unpkg.com/dexie/dist/dexie.js',
  'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js',
  'https://phoebeboo.github.io/mewoooo/pp.js',
  'https://cdn.jsdelivr.net/npm/streamsaver@2.0.6/StreamSaver.min.js',
  'https://s3plus.meituan.net/opapisdk/op_ticket_885190757_1758510900942_qdqqd_djw0z2.jpeg',
  'https://s3plus.meituan.net/opapisdk/op_ticket_885190757_1756312261242_qdqqd_g0eriz.jpeg'
];

// 1. 安装事件
self.addEventListener('install', event => {
  console.log('SW 正在安装...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('缓存已打开，正在缓存核心文件...');
        // 添加一个 catch 来处理缓存失败
        return cache.addAll(URLS_TO_CACHE).catch(error => {
            console.error('核心文件缓存失败:', error);
            // 抛出错误以防止安装不完整
            throw error;
        });
      })
      .then(() => {
        console.log('所有核心文件已缓存成功！');
        // 注意：我们在这里不再调用 self.skipWaiting()
        // 我们让新的更新流程来控制它
      })
  );
});

// 2. 激活事件
self.addEventListener('activate', event => {
  console.log('SW 正在激活...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('正在删除旧的缓存:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
        console.log('SW 已激活并准备好处理请求！');
        return self.clients.claim();
    })
  );
});

// 3. 拦截网络请求事件
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') {
    return;
  }

  const url = new URL(event.request.url);

  // --- 👇 新增的规则：开始 👇 ---
  // 如果请求的是 update-notice.html，则强制从网络获取，
  // 绕过 Service Worker 缓存和浏览器的 HTTP 缓存。
  if (url.pathname.endsWith('update-notice.html')) {
    console.log('SW: 强制从网络获取 update-notice.html...');
    event.respondWith(
      // 使用 'no-store' 策略来确保获取到的是最新版本
      fetch(event.request, { cache: 'no-store' })
    );
    return; // 结束，不执行下面的缓存逻辑
  }
  // --- 👆 新增的规则：结束 👆 ---

  // (你原来的缓存优先逻辑，用于处理所有其他文件)
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        if (cachedResponse) {
          // 如果缓存中有，直接返回缓存
          return cachedResponse;
        }
        // 如果缓存中没有，则从网络请求
        return fetch(event.request).catch(error => {
            console.error('网络请求失败:', error);
            // 可以在这里返回一个“离线”页面，如果需要的话
        });
      })
  );
});

// 4. 监听来自客户端（script.js）的消息 (保持不变)
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    console.log('SW 收到了 SKIP_WAITING 消息，将立即激活...');
    self.skipWaiting();
  }
});
