// ==========================================
// X Social App - 独立JS整合文件
// 版本: 1.0
// 使用方式:
// 1. 在HTML中引入: <script src="x-social-app.js" defer></script>
// 2. 调用初始化: window.renderXSocialScreenProxy()
// ==========================================

(function (window) {
  ('use strict');

  // ============================================
  // 第一部分: CSS样式注入
  // ============================================
  function injectStyles() {
    const styleId = 'x-social-app-styles';

    // 避免重复注入
    if (document.getElementById(styleId)) return;

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      /* ========== X社交页面基础样式 ========== */
      
                /* 自定义滚动条样式 - X风格（细长短小亮蓝色） */
      .tab-content::-webkit-scrollbar,
      #x-comments-page::-webkit-scrollbar,
      .comments-container::-webkit-scrollbar,
      .settings-content::-webkit-scrollbar,
      .profile-content::-webkit-scrollbar,
      .tweets-container::-webkit-scrollbar,
      #detail-comments-container::-webkit-scrollbar,
      .modal-body::-webkit-scrollbar,
      #identity-characters-list::-webkit-scrollbar,
      #characters-list::-webkit-scrollbar,
      #x-presets-list::-webkit-scrollbar {
        width: 3px;
      }

      .tab-content::-webkit-scrollbar-track,
      #x-comments-page::-webkit-scrollbar-track,
      .comments-container::-webkit-scrollbar-track,
      .settings-content::-webkit-scrollbar-track,
      .profile-content::-webkit-scrollbar-track,
      .tweets-container::-webkit-scrollbar-track,
      #detail-comments-container::-webkit-scrollbar-track,
      .modal-body::-webkit-scrollbar-track,
      #identity-characters-list::-webkit-scrollbar-track,
      #characters-list::-webkit-scrollbar-track,
      #x-presets-list::-webkit-scrollbar-track {
        background: transparent;
      }

      .tab-content::-webkit-scrollbar-thumb,
      #x-comments-page::-webkit-scrollbar-thumb,
      .comments-container::-webkit-scrollbar-thumb,
      .settings-content::-webkit-scrollbar-thumb,
      .profile-content::-webkit-scrollbar-thumb,
      .tweets-container::-webkit-scrollbar-thumb,
      #detail-comments-container::-webkit-scrollbar-thumb,
      .modal-body::-webkit-scrollbar-thumb,
      #identity-characters-list::-webkit-scrollbar-thumb,
      #characters-list::-webkit-scrollbar-thumb,
      #x-presets-list::-webkit-scrollbar-thumb {
        background-color: rgba(29, 155, 240, 0.5);
        border-radius: 10px;
        min-height: 30px;
        max-height: 80px;
      }

      .tab-content::-webkit-scrollbar-thumb:hover,
      #x-comments-page::-webkit-scrollbar-thumb:hover,
      .comments-container::-webkit-scrollbar-thumb:hover,
      .settings-content::-webkit-scrollbar-thumb:hover,
      .profile-content::-webkit-scrollbar-thumb:hover,
      .tweets-container::-webkit-scrollbar-thumb:hover,
      #detail-comments-container::-webkit-scrollbar-thumb:hover,
      .modal-body::-webkit-scrollbar-thumb:hover,
      #identity-characters-list::-webkit-scrollbar-thumb:hover,
      #characters-list::-webkit-scrollbar-thumb:hover,
      #x-presets-list::-webkit-scrollbar-thumb:hover {
        background-color: rgba(29, 155, 240, 0.8);
      }

      .tab-content::-webkit-scrollbar-thumb:active,
      #x-comments-page::-webkit-scrollbar-thumb:active,
      .comments-container::-webkit-scrollbar-thumb:active,
      .settings-content::-webkit-scrollbar-thumb:active,
      .profile-content::-webkit-scrollbar-thumb:active,
      .tweets-container::-webkit-scrollbar-thumb:active,
      #detail-comments-container::-webkit-scrollbar-thumb:active,
      .modal-body::-webkit-scrollbar-thumb:active,
      #identity-characters-list::-webkit-scrollbar-thumb:active,
      #characters-list::-webkit-scrollbar-thumb:active,
      #x-presets-list::-webkit-scrollbar-thumb:active {
        background-color: #1d9bf0;
      }

          /* 修复X社交页面高度布局问题 */
          #x-social-screen {
            height: 100vh !important;
            overflow: hidden !important;
          }

          .x-pages-container {
            min-height: 0 !important;
          }

          .x-page {
            min-height: 0 !important;
          }

          .x-bottom-nav {
            flex-shrink: 0 !important;
          }

          /* 确保所有可滚动容器都有正确的高度设置 */
          .comments-container,
          .settings-content,
          .profile-content,
          .tab-content {
            min-height: 0 !important;
          }

          /* 确保推文容器也有正确的滚动 */
          .tweets-container {
            overflow-y: auto;
            min-height: 0;
          }

          /* 用户评论删除功能样式 */
          .comment-user-info {
            display: flex !important;
            align-items: center !important;
            gap: 4px !important;
          }

          .comment-delete-btn:hover {
            background-color: rgba(239, 68, 68, 0.1) !important;
          }

          .comment-delete-btn svg {
            transition: fill 0.2s ease;
          }

          .comment-delete-btn:hover svg {
            fill: #dc2626 !important;
          }

          /* 用户人设设置按钮样式 */
          .persona-setting-btn {
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          }

          .persona-setting-btn:hover {
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
          }

          .persona-setting-btn:active {
            transform: scale(0.95) !important;
          }

          /* 推文项目 */
          #x-social-screen .tweet-item {
            padding: 15px;
            border-bottom: 1px solid #2f3336;
            display: flex;
            gap: 12px;
          }

          /* 用户头像 */
          #x-social-screen .tweet-avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            flex-shrink: 0;
          }

          /* 推文主要内容区域 */
          #x-social-screen .tweet-main {
            flex: 1;
            min-width: 0;
          }

          /* 用户信息行 */
          #x-social-screen .tweet-user-info {
            display: flex;
            align-items: center;
            gap: 5px;
            margin-bottom: 5px;
          }

          #x-social-screen .tweet-user-name {
            font-weight: 700;
            color: #fff;
            font-size: 15px;
          }

          #x-social-screen .tweet-verified {
            width: 18px;
            height: 18px;
            fill: #1d9bf0;
          }

          #x-social-screen .tweet-user-handle {
            color: #71767b;
            font-size: 15px;
          }

          #x-social-screen .tweet-time {
            color: #71767b;
            font-size: 15px;
          }

          #x-social-screen .tweet-more {
            margin-left: auto;
            color: #71767b;
            cursor: pointer;
            padding: 5px;
            border-radius: 50%;
          }

          #x-social-screen .tweet-more:hover {
            background-color: rgba(29, 155, 240, 0.1);
            color: #1d9bf0;
          }

          /* 推文内容 */
          #x-social-screen .tweet-content {
            color: #fff;
            font-size: 15px;
            line-height: 1.3;
            margin-bottom: 12px;
            word-wrap: break-word;
          }

          /* 话题标签和提及的高亮样式 */
          #x-social-screen .hashtag,
          #x-social-screen .mention {
            color: #1d9bf0;
            text-decoration: none;
            cursor: pointer;
          }

          #x-social-screen .hashtag:hover,
          #x-social-screen .mention:hover {
            text-decoration: underline;
          }

          /* 媒体内容 */
          #x-social-screen .tweet-media {
            margin-bottom: 12px;
            border-radius: 16px;
            overflow: hidden;
            position: relative;
          }

          #x-social-screen .tweet-image {
            width: 100%;
            max-height: 300px;
            object-fit: cover;
            display: block;
          }

          /* 敏感内容遮罩 */
          #x-social-screen .sensitive-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: #fff;
            cursor: pointer;
          }

          #x-social-screen .sensitive-text {
            font-size: 15px;
            font-weight: 700;
            margin-bottom: 8px;
          }

          #x-social-screen .sensitive-description {
            font-size: 13px;
            color: #71767b;
            text-align: center;
            padding: 0 20px;
          }

          /* 互动按钮 */
          .tweet-actions {
            display: flex;
            justify-content: space-between;
            max-width: 425px;
            margin-top: 5px;
          }

          .tweet-action {
            display: flex;
            align-items: center;
            gap: 5px;
            padding: 8px;
            border-radius: 50%;
            cursor: pointer;
            color: #71767b;
            font-size: 13px;
            transition: all 0.2s;
          }

          .tweet-action:hover {
            background-color: rgba(29, 155, 240, 0.1);
          }

          #x-social-screen .tweet-action.comment:hover {
            color: #1d9bf0;
          }

          #x-social-screen .tweet-action.retweet:hover {
            color: #00ba7c;
          }

          #x-social-screen .tweet-action.like:hover,
          #x-social-screen .tweet-action.like.liked {
            color: #f91880;
          }

          #x-social-screen .tweet-action.bookmark:hover {
            color: #1d9bf0;
          }

          #x-social-screen .tweet-action.share:hover {
            color: #1d9bf0;
          }

          #x-social-screen .action-icon {
            width: 18px;
            height: 18px;
          }

          /* 点赞动画效果 */
          #x-social-screen .like-animation {
            animation: likeHeartbeat 0.6s ease-in-out;
          }

          @keyframes likeHeartbeat {
            0% {
              transform: scale(1);
            }

            25% {
              transform: scale(1.2);
            }

            50% {
              transform: scale(1.4);
            }

            75% {
              transform: scale(1.2);
            }

            100% {
              transform: scale(1);
            }
          }

          #x-social-screen .tweet-action.like.liked .like-icon {
            fill: #f91880;
          }

          #x-social-screen .tweet-action.like.liked .like-count {
            color: #f91880;
          }

          /* 评论样式 */
          #x-social-screen .comment-item {
            padding: 15px;
            border-bottom: 1px solid #2f3336;
            display: flex;
            gap: 12px;
            position: relative;
          }

          /* 主评论后有回复时的连接线 */
          #x-social-screen .comment-item.has-replies::after {
            content: '';
            position: absolute;
            left: 35px;
            /* 头像中心位置 */
            bottom: -1px;
            width: 1px;
            height: 28px;
            background-color: #2f3336;
          }

          #x-social-screen .comment-main {
            flex: 1;
            min-width: 0;
          }

          #x-social-screen .comment-user-info {
            display: flex;
            align-items: center;
            gap: 5px;
            margin-bottom: 5px;
          }

          #x-social-screen .comment-content {
            color: #fff;
            font-size: 15px;
            line-height: 1.3;
            margin-bottom: 8px;
            word-wrap: break-word;
          }

          #x-social-screen .comment-actions {
            display: flex;
            justify-content: flex-start;
            gap: 60px;
            margin-top: 5px;
          }

          #x-social-screen .comment-action {
            display: flex;
            align-items: center;
            gap: 5px;
            padding: 8px;
            border-radius: 50%;
            cursor: pointer;
            color: #71767b;
            font-size: 13px;
            transition: all 0.2s;
          }

          /* 回复评论样式 */
          #x-social-screen .reply-item {
            margin-left: 50px;
            /* 精确对齐主评论的头像右侧 */
            padding-left: 0;
            padding-top: 8px;
            padding-bottom: 8px;
            border-left: none;
            position: relative;
            display: flex;
            align-items: flex-start;
            gap: 12px;
          }

          #x-social-screen .reply-item::before {
            content: '';
            position: absolute;
            left: -30px;
            top: 16px;
            width: 14px;
            height: 14px;
            border-left: 1px solid #2f3336;
            border-bottom: 1px solid #2f3336;
            border-bottom-left-radius: 6px;
          }

          #x-social-screen .reply-to {
            color: #1d9bf0;
            margin-right: 5px;
            font-weight: 400;
          }

          /* 回复评论的头像稍小一些 */
          #x-social-screen .reply-item .tweet-avatar {
            width: 32px;
            height: 32px;
          }

          /* 引用推文样式 */
          #x-social-screen .quoted-tweet {
            border: 1px solid #2f3336;
            border-radius: 16px;
            margin: 12px 0;
            padding: 12px;
            background-color: rgba(0, 0, 0, 0.3);
            transition: background-color 0.2s ease;
            cursor: pointer;
          }

          #x-social-screen .quoted-tweet:hover {
            background-color: rgba(255, 255, 255, 0.03);
          }

          #x-social-screen .quoted-user-info {
            display: flex;
            align-items: center;
            gap: 5px;
            margin-bottom: 8px;
          }

          #x-social-screen .quoted-user-avatar {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            flex-shrink: 0;
          }

          #x-social-screen .quoted-user-name {
            font-weight: 600;
            color: #fff;
            font-size: 13px;
          }

          #x-social-screen .quoted-user-handle {
            color: #71767b;
            font-size: 13px;
          }

          #x-social-screen .quoted-user-time {
            color: #71767b;
            font-size: 13px;
          }

          #x-social-screen .quoted-content {
            color: #fff;
            font-size: 14px;
            line-height: 1.3;
            word-wrap: break-word;
          }

          #x-social-screen .quote-indicator {
            color: #71767b;
            font-size: 13px;
            margin-bottom: 8px;
            display: flex;
            align-items: center;
            gap: 4px;
          }

          #x-social-screen .quote-indicator svg {
            width: 16px;
            height: 16px;
            fill: currentColor;
          }

          /* 搜索页面样式 */
          #x-social-screen .search-header {
            padding: 12px 16px;
            background: #000;
            border-bottom: 1px solid #2f3336;
          }

          #x-social-screen .search-box {
            display: flex;
            align-items: center;
            background: #202327;
            border-radius: 20px;
            padding: 10px 16px;
            gap: 12px;
          }

          #x-social-screen .search-box svg {
            width: 20px;
            height: 20px;
            fill: #71767b;
            flex-shrink: 0;
          }

          #x-social-screen .search-box input {
            flex: 1;
            background: transparent;
            border: none;
            outline: none;
            color: #fff;
            font-size: 15px;
          }

          #x-social-screen .search-box input::placeholder {
            color: #71767b;
          }

          #x-social-screen .search-tabs {
            display: flex;
            align-items: center;
            padding: 0 16px;
            border-bottom: 1px solid #2f3336;
            gap: 24px;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }

          #x-social-screen .search-tabs::-webkit-scrollbar {
            display: none;
          }

          #x-social-screen .search-tab {
            padding: 16px 0;
            cursor: pointer;
            color: #71767b;
            font-weight: 500;
            font-size: 15px;
            white-space: nowrap;
            position: relative;
            transition: color 0.2s;
          }

          #x-social-screen .search-tab.active {
            color: #fff;
            font-weight: 700;
          }

          #x-social-screen .search-tab.active::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: #1d9bf0;
            border-radius: 2px 2px 0 0;
          }

          #x-social-screen .search-tab:hover {
            color: #fff;
          }

          #x-social-screen .add-category-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            cursor: pointer;
            transition: background 0.2s;
          }

          #x-social-screen .add-category-btn svg {
            width: 20px;
            height: 20px;
            fill: #71767b;
          }

          #x-social-screen .add-category-btn:hover {
            background: rgba(29, 155, 240, 0.1);
          }

          #x-social-screen .add-category-btn:hover svg {
            fill: #1d9bf0;
          }

          #x-social-screen .trending-list {
            flex: 1;
            overflow-y: auto;
          }

          #x-social-screen .trending-item {
            padding: 12px 16px;
            cursor: pointer;
            transition: background 0.2s;
            position: relative;
          }

          #x-social-screen .trending-item:hover {
            background: rgba(255, 255, 255, 0.03);
          }

          #x-social-screen .trending-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 2px;
          }

          #x-social-screen .trending-category {
            color: #71767b;
            font-size: 14px;
            font-weight: 800;
            line-height: 16px;
          }

          #x-social-screen .trending-more {
            padding: 4px;
            border-radius: 50%;
            cursor: pointer;
            transition: background 0.2s;
          }

          #x-social-screen .trending-more:hover {
            background: rgba(29, 155, 240, 0.1);
          }

          #x-social-screen .trending-more svg {
            width: 18px;
            height: 18px;
            fill: #71767b;
          }

          #x-social-screen .trending-title {
            color: #fff;
            font-size: 15px;
            font-weight: 700;
            line-height: 20px;
            margin-bottom: 2px;
          }

          #x-social-screen .trending-count {
            color: #71767b;
            font-size: 13px;
            line-height: 16px;
            font-weight: 400;
          }

          #x-social-screen .refresh-trends-btn {
            position: fixed;
            right: 20px;
            bottom: 80px;
            width: 56px;
            height: 56px;
            background: #1d9bf0;
            border-radius: 50%;
            border: none;
            cursor: pointer;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
            display: none;
            align-items: center;
            justify-content: center;
            transition: transform 0.2s, background 0.2s;
            z-index: 100;
          }

          #x-social-screen .refresh-trends-btn:hover {
            background: #1a8cd8;
            transform: scale(1.05);
          }

          #x-social-screen .refresh-trends-btn:active {
            transform: scale(0.95);
          }

          #x-social-screen .refresh-trends-btn svg {
            width: 24px;
            height: 24px;
            fill: #fff;
          }

          #x-social-screen .refresh-trends-btn.spinning svg {
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
    `;

    document.head.appendChild(style);
    console.log('✅ X Social App: 样式已注入');
  }

  // ============================================
  // 第二部分: HTML结构生成
  // ============================================
  function createXSocialHTML() {
    // 检查是否已经存在
    if (document.getElementById('x-social-screen')) {
      console.log('⚠️ X Social Screen 已存在，跳过创建');
      return;
    }

    const container = document.createElement('div');
    container.id = 'x-social-screen';
    container.className = 'screen';
    container.style.cssText =
      'background-color: #000; color: #fff; display: flex; flex-direction: column; height: 100vh; overflow: hidden;';

    // 这里使用字符串模板或DOM操作创建完整的HTML结构
    container.innerHTML = `
    <!-- 顶部栏 -->
    <div class="x-top-bar"
        style="display: flex; justify-content: space-between; align-items: center; padding: 35px 15px; border-bottom: 1px solid #333; position: relative;">
      <!-- 返回按钮 -->
      <div class="x-back-btn" onclick="showScreen('home-screen')" style="cursor: pointer;">
        <svg viewBox="0 0 24 24" aria-hidden="true" style="width: 20px; height: 20px; fill: #fff;">
          <g>
            <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"></path>
          </g>
        </svg>
      </div>
      <!-- 头像放中间 -->
      <div class="x-profile-pic"
        style="display: flex; justify-content: center; align-items: center; position: absolute; left: 50%; transform: translateX(-50%);">
        <img id="top-bar-avatar" 
             src="https://i.postimg.cc/pXxk1JXk/IMG-6442.jpg" 
             alt="Profile"
             onclick="switchXPage('profile')" 
             style="width: 36px; height: 36px; border-radius: 50%; cursor: pointer; transition: opacity 0.2s;"
             onmouseover="this.style.opacity='0.8'"
             onmouseout="this.style.opacity='1'">
      </div>
      <!-- 右侧按钮区域 -->
      <div style="display: flex; align-items: center; gap: 15px;">
        <!-- 刷新按钮 -->
        <div class="x-refresh-btn" onclick="refreshXTweets()" style="cursor: pointer;">
          <svg viewBox="0 0 24 24" aria-hidden="true" style="width: 22px; height: 22px; fill: #fff;">
            <g>
              <path
                d="M19 8l-4 4h3c0 3.31-2.69 6-6 6-1.01 0-1.97-.25-2.8-.7l-1.46 1.46C8.97 19.54 10.43 20 12 20c4.42 0 8-3.58 8-8h3l-4-4zM6 12c0-3.31 2.69-6 6-6 1.01 0 1.97.25 2.8.7l1.46-1.46C15.03 4.46 13.57 4 12 4c-4.42 0-8 3.58-8 8H1l4 4 4-4H6z">
              </path>
            </g>
          </svg>
        </div>
        <!-- 设置按钮 -->
        <div class="x-settings" onclick="switchXPage('settings')" style="cursor: pointer;">
          <svg viewBox="0 0 24 24" aria-hidden="true" style="width: 24px; height: 24px; fill: #fff;">
            <g>
              <path
                d="M10.54 1.75h2.92l1.57 2.36c.11.17.32.25.53.21l2.53-.59 2.17 2.17-.58 2.54c-.05.2.04.41.21.53l2.36 1.57v2.92l-2.36 1.57c-.17.12-.26.33-.21.53l.58 2.54-2.17 2.17-2.53-.59c-.21-.04-.42.04-.53.21l-1.57 2.36h-2.92l-1.58-2.36c-.11-.17-.32-.25-.52-.21l-2.54.59-2.17-2.17.58-2.54c.05-.2-.03-.41-.21-.53l-2.35-1.57v-2.92L4.1 8.97c.18-.12.26-.33.21-.53L3.73 5.9 5.9 3.73l2.54.59c.2.04.41-.04.52-.21l1.58-2.36zm1.07 2l-.98 1.47C10.05 6.08 9 6.5 7.99 6.27l-1.46-.34-.6.6.33 1.46c.24 1.01-.18 2.07-1.05 2.64l-1.46.98v.78l1.46.98c.87.57 1.29 1.63 1.05 2.64l-.33 1.46.6.6 1.46-.34c1.01-.23 2.06.19 2.64 1.05l.98 1.47h.78l.97-1.47c.58-.86 1.63-1.28 2.65-1.05l1.45.34.61-.6-.34-1.46c-.23-1.01.18-2.07 1.05-2.64l1.47-.98v-.78l-1.47-.98c-.87-.57-1.28-1.63-1.05-2.64l.34-1.46-.61-.6-1.45.34c-1.02.23-2.07-.19-2.65-1.05l-.97-1.47h-.78zM12 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5c.82 0 1.5-.67 1.5-1.5s-.68-1.5-1.5-1.5zM8.5 12c0-1.93 1.56-3.5 3.5-3.5 1.93 0 3.5 1.57 3.5 3.5s-1.57 3.5-3.5 3.5c-1.94 0-3.5-1.57-3.5-3.5z">
              </path>
            </g>
          </svg>
        </div>
      </div>
    </div>

    <!-- 各个页面容器 -->
    <div class="x-pages-container"
      style="flex: 1; display: flex; flex-direction: column; overflow: hidden; min-height: 0; position: relative;">
      <!-- 主页页面 - 默认显示 -->
      <div id="x-home-page" class="x-page active"
        style="flex: 1; display: flex; flex-direction: column; overflow: hidden; min-height: 0;">

        <!-- 主页标签栏 -->
        <div class="x-home-tabs" style="display: flex; border-bottom: 1px solid #333;">
          <!-- "为你推荐"标签 -->
          <div class="x-tab active" onclick="switchHomeTab('for-you')"
            style="flex: 1; text-align: center; padding: 15px 0; font-weight: 600; cursor: pointer; position: relative;">
            为你推荐
            <div class="tab-indicator"
              style="position: absolute; bottom: 0; left: 10%; width: 80%; height: 2px; background-color: #1d9bf0; border-radius: 2px;">
            </div>
          </div>

          <!-- "正在关注"标签 -->
          <div class="x-tab" onclick="switchHomeTab('following')"
            style="flex: 1; text-align: center; padding: 15px 0; font-weight: 600; cursor: pointer; position: relative; color: #71767b;">
            正在关注
            <div class="tab-indicator"
              style="position: absolute; bottom: 0; left: 10%; width: 80%; height: 2px; background-color: #1d9bf0; border-radius: 2px; display: none;">
            </div>
          </div>
        </div>

        <!-- 内容区域 - 为你推荐 -->
        <div id="for-you-content" class="tab-content active"
          style="flex: 1; display: flex; flex-direction: column; overflow-y: auto; min-height: 0;">
          <!-- 推文列表容器 -->
          <div class="tweets-container" style="padding: 0;">
            <!-- 推文将通过JavaScript动态生成在这里 -->
          </div>
        </div>

        <!-- 内容区域 - 正在关注 -->
        <div id="following-content" class="tab-content"
          style="flex: 1; display: none; flex-direction: column; overflow-y: auto; min-height: 0;">
          <!-- 推文列表容器 -->
          <div class="tweets-container" style="padding: 0;">
            <!-- 推文将通过JavaScript动态生成在这里 -->
          </div>
        </div>
  
        
  
        <!-- 添加浮动发布按钮 -->
        <div class="compose-btn" onclick="openComposeTweetModal()"
          style="position: fixed; bottom: 80px; right: 20px; width: 56px; height: 56px; background-color: #1d9bf0; border-radius: 50%; display: flex; justify-content: center; align-items: center; box-shadow: 0 2px 10px rgba(0,0,0,0.3); cursor: pointer;">
          <svg viewBox="0 0 24 24" aria-hidden="true" style="width: 24px; height: 24px; fill: #fff; stroke-width: 2;">
            <g>
              <path d="M12 4L12 20M4 12L20 12" stroke="white" stroke-linecap="round"></path>
            </g>
          </svg>
        </div>
      </div>

      <!-- 角色X资料设置弹窗 -->
      <div id="character-x-profile-modal"
        style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.8); z-index: 30; backdrop-filter: blur(8px);">
        <div style="display: flex; justify-content: center; align-items: center; height: 100%; padding: 20px;">
          <div
            style="background-color: #000; border: 1px solid #333; border-radius: 16px; width: 100%; max-width: 600px; max-height: 90vh; overflow-y: auto;">

            <!-- 弹窗头部 -->
            <div
              style="display: flex; align-items: center; justify-content: space-between; padding: 20px 20px 16px 20px; border-bottom: 1px solid #333;">
              <h2 style="color: #fff; font-size: 20px; font-weight: 700; margin: 0;">设置X资料</h2>
              <button onclick="closeCharacterXProfileModal()"
                style="background: none; border: none; color: #71767b; cursor: pointer; padding: 8px;">
                <svg viewBox="0 0 24 24" style="width: 20px; height: 20px; fill: currentColor;">
                  <path
                    d="M18.36 6.64c.39.39.39 1.02 0 1.41L13.41 12l4.95 4.95c.39.39.39 1.02 0 1.41-.39.39-1.02.39-1.41 0L12 13.41l-4.95 4.95c-.39.39-1.02.39-1.41 0-.39-.39-.39-1.02 0-1.41L10.59 12 5.64 7.05c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0L12 10.59l4.95-4.95c.39-.39 1.02-.39 1.41 0z" />
                </svg>
              </button>
            </div>

            <!-- 角色基本信息显示 -->
            <div id="character-info-display"
              style="padding: 20px; border-bottom: 1px solid #333; background-color: #0a0a0a;">
              <!-- 角色信息将动态填充 -->
            </div>

            <!-- 表单内容 -->
            <div style="padding: 20px;">
              <form id="character-x-profile-form">

                <!-- X头像设置 -->
                <div style="margin-bottom: 24px;">
                  <label
                    style="display: block; color: #fff; font-size: 15px; font-weight: 600; margin-bottom: 12px;">X头像</label>
                  <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 12px;">
                    <img id="character-x-avatar" src="" alt="X头像"
                      style="width: 80px; height: 80px; border-radius: 50%; border: 3px solid #333;">
                    <div style="flex: 1;">
                      <div style="color: #71767b; font-size: 13px; margin-bottom: 8px;">头像链接</div>
                      <input type="url" id="character-x-avatar-url" placeholder="https://example.com/avatar.jpg"
                        style="width: 100%; background-color: #1a1a1a; border: 1px solid #333; border-radius: 8px; color: #fff; padding: 12px; font-size: 14px; outline: none;"
                        oninput="updateCharacterXAvatar(this.value)" onfocus="this.style.borderColor='#1d9bf0'"
                        onblur="this.style.borderColor='#333'">
                    </div>
                  </div>
                  <div style="color: #71767b; font-size: 12px;">
                    请输入图片链接URL，支持JPG、PNG、GIF格式
                  </div>
                </div>

                <!-- X用户名 -->
                <div style="margin-bottom: 20px;">
                  <label
                    style="display: block; color: #fff; font-size: 15px; font-weight: 600; margin-bottom: 8px;">X用户名</label>
                  <input type="text" id="character-x-name" placeholder="显示名称"
                    style="width: 100%; background-color: #1a1a1a; border: 1px solid #333; border-radius: 8px; color: #fff; padding: 12px; font-size: 15px; outline: none;"
                    maxlength="50">
                </div>

                <!-- X句柄 -->
                <div style="margin-bottom: 20px;">
                  <label
                    style="display: block; color: #fff; font-size: 15px; font-weight: 600; margin-bottom: 8px;">X句柄</label>
                  <div style="position: relative;">
                    <span
                      style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #71767b; font-size: 15px;">@</span>
                    <input type="text" id="character-x-handle" placeholder="username"
                      style="width: 100%; background-color: #1a1a1a; border: 1px solid #333; border-radius: 8px; color: #fff; padding: 12px 12px 12px 30px; font-size: 15px; outline: none;"
                      maxlength="15">
                  </div>
                </div>

                <!-- 认证状态 -->
                <div style="margin-bottom: 20px;">
                  <label style="display: flex; align-items: center; gap: 12px; cursor: pointer;">
                    <input type="checkbox" id="character-x-verified"
                      style="width: 18px; height: 18px; accent-color: #1d9bf0;">
                    <span style="color: #fff; font-size: 15px; font-weight: 600;">认证用户</span>
                    <svg viewBox="0 0 24 24" style="width: 16px; height: 16px; fill: #1d9bf0;">
                      <path
                        d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-2.5-1.668c-.326-.217-.413-.656-.196-.982.217-.326.656-.414.982-.196l1.875 1.25 3.75-5.625c.22-.33.66-.418.99-.196.33.22.418.66.196.99z" />
                    </svg>
                  </label>
                </div>

                <!-- 背景图设置 -->
                <div style="margin-bottom: 24px;">
                  <label style="display: block; color: #fff; font-size: 15px; font-weight: 600; margin-bottom: 12px;">背景图（封面图）</label>
                  <div style="margin-bottom: 12px;">
                    <img id="character-x-cover-preview" src="https://i.postimg.cc/qRzMB6nQ/default-cover.jpg" alt="背景图预览"
                      style="width: 100%; height: 120px; border-radius: 8px; object-fit: cover; border: 1px solid #333;">
                  </div>
                  <div style="color: #71767b; font-size: 13px; margin-bottom: 8px;">背景图链接</div>
                  <input type="url" id="character-x-cover-url" placeholder="https://example.com/cover.jpg"
                    style="width: 100%; background-color: #1a1a1a; border: 1px solid #333; border-radius: 8px; color: #fff; padding: 12px; font-size: 14px; outline: none;"
                    oninput="updateCharacterXCover(this.value)" onfocus="this.style.borderColor='#1d9bf0'"
                    onblur="this.style.borderColor='#333'">
                  <div style="color: #71767b; font-size: 12px; margin-top: 4px;">
                    请输入图片链接URL，支持JPG、PNG、GIF格式
                  </div>
                </div>

                <!-- 自定义标签1 -->
                <div style="margin-bottom: 24px;">
                  <label style="display: block; color: #fff; font-size: 15px; font-weight: 600; margin-bottom: 8px;">自定义标签1</label>
                  <div style="display: flex; gap: 8px; margin-bottom: 8px;">
                    <input type="text" id="character-tag1-icon" placeholder="✨" maxlength="2" style="
                      width: 50px;
                      background-color: #1a1a1a;
                      border: 1px solid #333;
                      border-radius: 4px;
                      color: #fff;
                      padding: 12px;
                      font-size: 17px;
                      outline: none;
                      text-align: center;
                    " onfocus="this.style.borderColor='#1d9bf0'" onblur="this.style.borderColor='#333'">
                    <input type="text" id="character-custom-tag1" placeholder="例如：科技博主" maxlength="30" style="
                      flex: 1;
                      background-color: #1a1a1a;
                      border: 1px solid #333;
                      border-radius: 4px;
                      color: #fff;
                      padding: 12px;
                      font-size: 15px;
                      outline: none;
                    " onfocus="this.style.borderColor='#1d9bf0'" onblur="this.style.borderColor='#333'">
                  </div>
                  <div style="display: flex; gap: 8px; align-items: center;">
                    <label style="color: #71767b; font-size: 12px; min-width: 40px;">颜色:</label>
                    <input type="color" id="character-tag1-color" value="#71767b" style="
                      width: 40px;
                      height: 32px;
                      border: 1px solid #333;
                      border-radius: 4px;
                      background: transparent;
                      cursor: pointer;
                      outline: none;
                    ">
                  </div>
                </div>

                <!-- 自定义标签2 -->
                <div style="margin-bottom: 24px;">
                  <label style="display: block; color: #fff; font-size: 15px; font-weight: 600; margin-bottom: 8px;">自定义标签2</label>
                  <div style="display: flex; gap: 8px; margin-bottom: 8px;">
                    <input type="text" id="character-tag2-icon" placeholder="📅" maxlength="2" style="
                      width: 50px;
                      background-color: #1a1a1a;
                      border: 1px solid #333;
                      border-radius: 4px;
                      color: #fff;
                      padding: 12px;
                      font-size: 17px;
                      outline: none;
                      text-align: center;
                    " onfocus="this.style.borderColor='#1d9bf0'" onblur="this.style.borderColor='#333'">
                    <input type="text" id="character-custom-tag2" placeholder="例如：2024年加入" maxlength="30" style="
                      flex: 1;
                      background-color: #1a1a1a;
                      border: 1px solid #333;
                      border-radius: 4px;
                      color: #fff;
                      padding: 12px;
                      font-size: 15px;
                      outline: none;
                    " onfocus="this.style.borderColor='#1d9bf0'" onblur="this.style.borderColor='#333'">
                  </div>
                  <div style="display: flex; gap: 8px; align-items: center;">
                    <label style="color: #71767b; font-size: 12px; min-width: 40px;">颜色:</label>
                    <input type="color" id="character-tag2-color" value="#71767b" style="
                      width: 40px;
                      height: 32px;
                      border: 1px solid #333;
                      border-radius: 4px;
                      background: transparent;
                      cursor: pointer;
                      outline: none;
                    ">
                  </div>
                </div>

                <!-- 正在关注数量 -->
                <div style="margin-bottom: 20px;">
                  <label style="display: block; color: #fff; font-size: 15px; font-weight: 600; margin-bottom: 8px;">正在关注数量</label>
                  <input type="text" id="character-following-count" placeholder="156, 1.2K, 2.5M等" maxlength="20" style="
                    width: 100%;
                    background-color: #1a1a1a;
                    border: 1px solid #333;
                    border-radius: 8px;
                    color: #fff;
                    padding: 12px;
                    font-size: 15px;
                    outline: none;
                  " onfocus="this.style.borderColor='#1d9bf0'" onblur="this.style.borderColor='#333'">
                  <div style="color: #71767b; font-size: 12px; margin-top: 4px;">可输入任意数字、字母、符号组合</div>
                </div>

                <!-- 关注者数量 -->
                <div style="margin-bottom: 20px;">
                  <label style="display: block; color: #fff; font-size: 15px; font-weight: 600; margin-bottom: 8px;">关注者数量</label>
                  <input type="text" id="character-followers-count" placeholder="89, 1.5K, 3.2M等" maxlength="20" style="
                    width: 100%;
                    background-color: #1a1a1a;
                    border: 1px solid #333;
                    border-radius: 8px;
                    color: #fff;
                    padding: 12px;
                    font-size: 15px;
                    outline: none;
                  " onfocus="this.style.borderColor='#1d9bf0'" onblur="this.style.borderColor='#333'">
                  <div style="color: #71767b; font-size: 12px; margin-top: 4px;">可输入任意数字、字母、符号组合</div>
                </div>

                <!-- X简介 -->
                <div style="margin-bottom: 20px;">
                  <label
                    style="display: block; color: #fff; font-size: 15px; font-weight: 600; margin-bottom: 8px;">X简介</label>
                  <textarea id="character-x-bio" placeholder="介绍一下这个角色在X上的身份..."
                    style="width: 100%; min-height: 80px; background-color: #1a1a1a; border: 1px solid #333; border-radius: 8px; color: #fff; padding: 12px; font-size: 15px; resize: vertical; outline: none; font-family: inherit;"
                    maxlength="160"></textarea>
                  <div style="text-align: right; color: #71767b; font-size: 13px; margin-top: 4px;">
                    <span id="character-bio-count">0</span>/160
                  </div>
                </div>

                <!-- 公众身份设置 -->
                <div style="margin-bottom: 20px;">
                  <label
                    style="display: block; color: #fff; font-size: 15px; font-weight: 600; margin-bottom: 8px;">公众身份</label>
                  <div style="color: #71767b; font-size: 13px; margin-bottom: 8px; line-height: 1.4;">
                    描述角色在X平台的公众身份（如明星、网红、博主等）。这将影响其他用户对该角色的讨论几率，身份越知名可能引起更多关注和讨论。此信息完全公开。
                  </div>

                  <!-- 重要提醒 -->
                  <div
                    style="background-color: rgba(29, 155, 240, 0.1); border: 1px solid #1d9bf0; border-radius: 8px; padding: 12px; margin-bottom: 12px;">
                    <div style="color: #1d9bf0; font-size: 13px; line-height: 1.4;">
                      <strong>📌 重要提醒：</strong>角色将根据完整人设进行扮演，但<strong
                        style="color: #1d9bf0;">X平台其他用户无法读取角色人设</strong>，仅能看到此公众身份信息。如需让其他用户了解的角色特点、背景故事等内容，请全部详细填写至公众身份中。
                    </div>
                  </div>

                  <textarea id="character-public-identity"
                    placeholder="例如：知名演员、歌手、网络红人、专业博主等... 可详细描述角色的公开背景、成就、特点等，无字数限制"
                    style="width: 100%; min-height: 120px; background-color: #1a1a1a; border: 1px solid #333; border-radius: 8px; color: #fff; padding: 12px; font-size: 15px; resize: vertical; outline: none; font-family: inherit;"></textarea>
                  <div style="color: #71767b; font-size: 12px; margin-top: 4px;">
                    💡 无字数限制，可详细描述角色的公开信息
                  </div>
                </div>

                <!-- 真名公开设置 -->
                <div style="margin-bottom: 20px;">
                  <label
                    style="display: block; color: #fff; font-size: 15px; font-weight: 600; margin-bottom: 8px;">真名设置</label>
                  <div style="color: #71767b; font-size: 13px; margin-bottom: 12px; line-height: 1.4;">
                    选择是否公开角色的真实姓名。公开后，其他用户都能看到角色真名，情侣认证时也会显示双方真名。
                  </div>

                  <!-- 是否公开真名复选框 -->
                  <div style="margin-bottom: 12px;">
                    <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                      <input type="checkbox" id="character-show-real-name" style="
                        width: 16px;
                        height: 16px;
                        accent-color: #1d9bf0;
                      " onchange="toggleCharacterRealNameInput()">
                      <span style="color: #fff; font-size: 15px;">公开真实姓名</span>
                    </label>
                  </div>

                  <!-- 真名输入框 -->
                  <div id="character-real-name-input-container" style="display: none;">
                    <input type="text" id="character-real-name" placeholder="请输入角色的真实姓名"
                      style="width: 100%; background-color: #1a1a1a; border: 1px solid #333; border-radius: 8px; color: #fff; padding: 12px; font-size: 15px; outline: none;"
                      maxlength="50">
                    <div style="text-align: right; color: #71767b; font-size: 13px; margin-top: 4px;">
                      <span id="character-real-name-count">0</span>/50
                    </div>
                  </div>
                </div>

                <!-- NPC关系绑定 -->
                <div style="margin-bottom: 20px;">
                  <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
                    <label style="color: #fff; font-size: 15px; font-weight: 600;">NPC关系绑定</label>
                    <button type="button" onclick="openAddRelationshipModal()"
                      style="background-color: #1d9bf0; color: #fff; border: none; border-radius: 16px; padding: 6px 12px; font-size: 12px; cursor: pointer;">
                      + 添加关系
                    </button>
                  </div>
                  <div style="color: #71767b; font-size: 13px; margin-bottom: 12px;">
                    绑定NPC角色作为朋友、亲人等，让角色能够识别和互动
                  </div>

                  <!-- 关系列表 -->
                  <div id="character-relationships-list" style="max-height: 200px; overflow-y: auto;">
                    <!-- 关系列表将动态生成 -->
                  </div>
                </div>

                <!-- 保存按钮 -->
                <div style="display: flex; gap: 12px; margin-top: 32px;">
                  <button type="button" onclick="closeCharacterXProfileModal()"
                    style="flex: 1; background-color: transparent; color: #fff; border: 1px solid #536471; border-radius: 20px; padding: 12px 24px; font-size: 15px; font-weight: 700; cursor: pointer;">
                    取消
                  </button>
                  <button type="submit"
                    style="flex: 1; background-color: #1d9bf0; color: #fff; border: none; border-radius: 20px; padding: 12px 24px; font-size: 15px; font-weight: 700; cursor: pointer;">
                    保存X资料
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>

      <!-- NPC关系编辑弹窗 -->
      <div id="relationship-modal"
        style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.8); z-index: 40; backdrop-filter: blur(8px);">
        <div style="display: flex; justify-content: center; align-items: center; height: 100%; padding: 20px;">
          <div
            style="background-color: #000; border: 1px solid #333; border-radius: 16px; width: 100%; max-width: 500px;">

            <!-- 弹窗头部 -->
            <div
              style="display: flex; align-items: center; justify-content: space-between; padding: 20px 20px 16px 20px; border-bottom: 1px solid #333;">
              <h3 id="relationship-modal-title" style="color: #fff; font-size: 18px; font-weight: 700; margin: 0;">
                添加NPC关系</h3>
              <button onclick="closeRelationshipModal()"
                style="background: none; border: none; color: #71767b; cursor: pointer; padding: 8px;">
                <svg viewBox="0 0 24 24" style="width: 20px; height: 20px; fill: currentColor;">
                  <path
                    d="M18.36 6.64c.39.39.39 1.02 0 1.41L13.41 12l4.95 4.95c.39.39.39 1.02 0 1.41-.39.39-1.02.39-1.41 0L12 13.41l-4.95 4.95c-.39.39-1.02.39-1.41 0-.39-.39-.39-1.02 0-1.41L10.59 12 5.64 7.05c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0L12 10.59l4.95-4.95c.39-.39 1.02-.39 1.41 0z" />
                </svg>
              </button>
            </div>

            <!-- 表单内容 -->
            <div style="padding: 20px;">
              <form id="relationship-form">

                <!-- NPC名称 -->
                <div style="margin-bottom: 16px;">
                  <label
                    style="display: block; color: #fff; font-size: 14px; font-weight: 600; margin-bottom: 8px;">NPC名称</label>
                  <input type="text" id="relationship-npc-name" placeholder="输入NPC的名称"
                    style="width: 100%; background-color: #1a1a1a; border: 1px solid #333; border-radius: 8px; color: #fff; padding: 12px; font-size: 14px; outline: none;"
                    maxlength="30">
                </div>

                <!-- NPC句柄 -->
                <div style="margin-bottom: 16px;">
                  <label
                    style="display: block; color: #fff; font-size: 14px; font-weight: 600; margin-bottom: 8px;">NPC句柄</label>
                  <div style="position: relative;">
                    <span
                      style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #71767b; font-size: 14px;">@</span>
                    <input type="text" id="relationship-npc-handle" placeholder="npc_username"
                      style="width: 100%; background-color: #1a1a1a; border: 1px solid #333; border-radius: 8px; color: #fff; padding: 12px 12px 12px 30px; font-size: 14px; outline: none;"
                      maxlength="15">
                  </div>
                </div>

                <!-- 关系类型 -->
                <div style="margin-bottom: 16px;">
                  <label
                    style="display: block; color: #fff; font-size: 14px; font-weight: 600; margin-bottom: 8px;">关系类型</label>
                  <select id="relationship-type"
                    style="width: 100%; background-color: #1a1a1a; border: 1px solid #333; border-radius: 8px; color: #fff; padding: 12px; font-size: 14px; outline: none;">
                    <option value="朋友">朋友</option>
                    <option value="亲人">亲人</option>
                    <option value="恋人">恋人</option>
                    <option value="同事">同事</option>
                    <option value="同学">同学</option>
                    <option value="邻居">邻居</option>
                    <option value="其他">其他</option>
                  </select>
                </div>

                <!-- 关系描述 -->
                <div style="margin-bottom: 20px;">
                  <label
                    style="display: block; color: #fff; font-size: 14px; font-weight: 600; margin-bottom: 8px;">关系描述</label>
                  <textarea id="relationship-description" placeholder="详细描述两人的关系，如何认识的，相处模式等..."
                    style="width: 100%; min-height: 80px; background-color: #1a1a1a; border: 1px solid #333; border-radius: 8px; color: #fff; padding: 12px; font-size: 14px; resize: vertical; outline: none; font-family: inherit;"
                    maxlength="200"></textarea>
                  <div style="text-align: right; color: #71767b; font-size: 12px; margin-top: 4px;">
                    <span id="relationship-desc-count">0</span>/200
                  </div>
                </div>

                <!-- 操作按钮 -->
                <div style="display: flex; gap: 12px;">
                  <button type="button" onclick="closeRelationshipModal()"
                    style="flex: 1; background-color: transparent; color: #fff; border: 1px solid #536471; border-radius: 20px; padding: 10px 20px; font-size: 14px; font-weight: 700; cursor: pointer;">
                    取消
                  </button>
                  <button type="submit"
                    style="flex: 1; background-color: #1d9bf0; color: #fff; border: none; border-radius: 20px; padding: 10px 20px; font-size: 14px; font-weight: 700; cursor: pointer;">
                    保存关系
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>

      <!-- 搜索页面 -->
      <div id="x-search-page" class="x-page"
        style="flex: 1; display: none; flex-direction: column; overflow: hidden; min-height: 0;">
        
        <!-- 搜索框 -->
        <div class="search-header">
          <button id="search-back-btn" onclick="backToTrending()" style="
            display: none;
            background: none;
            border: none;
            padding: 8px;
            cursor: pointer;
            margin-right: 8px;
            border-radius: 50%;
            transition: background-color 0.2s;
          " onmouseover="this.style.backgroundColor='rgba(239,243,244,0.1)'"
            onmouseout="this.style.backgroundColor='transparent'">
            <svg viewBox="0 0 24 24" style="width: 20px; height: 20px; fill: #fff;">
              <g><path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"></path></g>
            </svg>
          </button>
          <div class="search-box">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <g><path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"></path></g>
            </svg>
            <input type="text" placeholder="搜索 X" id="search-input" 
              oninput="toggleSearchButton()" 
              onkeydown="if(event.key==='Enter') performSearch()">
            <button id="search-submit-btn" onclick="performSearch()" style="
              display: none;
              background: none;
              border: none;
              padding: 8px;
              cursor: pointer;
              border-radius: 50%;
              transition: background-color 0.2s;
            " onmouseover="this.style.backgroundColor='rgba(29,155,240,0.1)'"
              onmouseout="this.style.backgroundColor='transparent'">
              <svg viewBox="0 0 24 24" style="width: 20px; height: 20px; fill: #1d9bf0;">
                <g><path d="M2.504 21.866l.526-2.108C3.04 19.719 4 15.823 4 12s-.96-7.719-.97-7.757l-.527-2.109L22.236 12 2.504 21.866zM5.981 13c-.072 1.962-.34 3.833-.583 5.183L17.764 12 5.398 5.818c.242 1.349.51 3.221.583 5.183H10v2H5.981z"></path></g>
              </svg>
            </button>
          </div>
        </div>

        <!-- 热搜视图 -->
        <div id="trending-view" style="display: flex; flex-direction: column; flex: 1; overflow: hidden;">
          <!-- 分类标签 -->
          <div class="search-tabs">
            <div class="search-tab active" onclick="switchSearchTab('recommended')">为你推荐</div>
            <div class="search-tab" onclick="switchSearchTab('trending')">当前趋势</div>
            <div class="add-category-btn" onclick="openAddCategoryModal()" title="添加自定义分类">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <g><path d="M19.5 12.75h-6.75V19.5h-1.5v-6.75H4.5v-1.5h6.75V4.5h1.5v6.75h6.75v1.5z"></path></g>
              </svg>
            </div>
          </div>

          <!-- 热搜列表 -->
          <div class="trending-list" id="trending-list">
            <!-- 热搜项目将通过JavaScript动态生成 -->
          </div>
        </div>

        <!-- 搜索结果视图 -->
        <div id="search-results-view" style="display: none; flex-direction: column; flex: 1; overflow: hidden;">
          <!-- 搜索结果标签栏 -->
          <div class="search-tabs">
            <div class="search-tab active" onclick="switchSearchResultTab('top')">热门</div>
            <div class="search-tab" onclick="switchSearchResultTab('latest')">最新</div>
            <div class="search-tab" onclick="switchSearchResultTab('users')">用户</div>
          </div>

          <!-- 搜索结果内容 -->
          <div id="search-results-content" style="
            flex: 1;
            overflow-y: auto;
            background: #000;
          ">
            <!-- 搜索结果将动态生成 -->
          </div>
        </div>

        <!-- 刷新按钮 -->
        <button class="refresh-trends-btn" onclick="refreshTrends()" title="刷新热搜">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <g><path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"></path></g>
          </svg>
        </button>
      </div>

      <!-- 自定义分类管理模态框 -->
      <div id="category-manager-modal" style="
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        z-index: 30;
        overflow-y: auto;
        backdrop-filter: blur(8px);
      " onclick="closeCategoryModal(event)">
        <div style="
          background-color: #000;
          margin: 40px auto;
          border-radius: 16px;
          max-width: 600px;
          width: calc(100% - 40px);
          border: 1px solid #333;
        " onclick="event.stopPropagation()">
          <!-- 模态框头部 -->
          <div style="
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 16px 20px;
            border-bottom: 1px solid #333;
          ">
            <h2 style="color: #fff; font-size: 20px; font-weight: 700; margin: 0;">管理热搜分类</h2>
            <div onclick="closeCategoryModal()" style="
              cursor: pointer;
              padding: 8px;
              border-radius: 50%;
              transition: background-color 0.2s;
            " onmouseover="this.style.backgroundColor='rgba(239,243,244,0.1)'"
              onmouseout="this.style.backgroundColor='transparent'">
              <svg viewBox="0 0 24 24" style="width: 20px; height: 20px; fill: #fff;">
                <g><path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path></g>
              </svg>
            </div>
          </div>

          <!-- 模态框内容 -->
          <div style="padding: 20px; max-height: calc(100vh - 200px); overflow-y: auto;">
            <!-- 说明 -->
            <div style="
              background-color: rgba(29, 155, 240, 0.1);
              border: 1px solid #1d9bf0;
              border-radius: 8px;
              padding: 12px;
              margin-bottom: 20px;
            ">
              <p style="color: #1d9bf0; font-size: 13px; line-height: 1.4; margin: 0;">
                💡 自定义分类将在刷新热搜时生成相应内容。可以添加任意分类（如"动漫"、"二次元"等），并描述该分类下的内容类型。
              </p>
            </div>

            <!-- 自定义分类列表 -->
            <div style="margin-bottom: 20px;">
              <div style="
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 12px;
              ">
                <h3 style="color: #fff; font-size: 16px; font-weight: 600; margin: 0;">自定义分类</h3>
                <button onclick="addNewCategory()" style="
                  background-color: #1d9bf0;
                  color: #fff;
                  border: none;
                  border-radius: 20px;
                  padding: 6px 16px;
                  font-size: 14px;
                  font-weight: 600;
                  cursor: pointer;
                  transition: all 0.2s;
                " onmouseover="this.style.backgroundColor='#1a8cd8'"
                  onmouseout="this.style.backgroundColor='#1d9bf0'">
                  + 添加分类
                </button>
              </div>

              <!-- 分类列表容器 -->
              <div id="custom-categories-list" style="display: flex; flex-direction: column; gap: 12px;">
                <!-- 分类项将动态生成 -->
              </div>
            </div>

            <!-- 保存按钮 -->
            <button onclick="saveCustomCategories()" style="
              width: 100%;
              background-color: #1d9bf0;
              color: #fff;
              border: none;
              border-radius: 25px;
              padding: 14px;
              font-size: 16px;
              font-weight: 700;
              cursor: pointer;
              transition: all 0.2s;
            " onmouseover="this.style.backgroundColor='#1a8cd8'"
              onmouseout="this.style.backgroundColor='#1d9bf0'">
              保存设置
            </button>
          </div>
        </div>
      </div>

      <!-- 通知页面 -->
      <div id="x-notifications-page" class="x-page"
        style="flex: 1; display: none; flex-direction: column; overflow: hidden; min-height: 0;">
        <div style="flex: 1; display: flex; justify-content: center; align-items: center;">
          <div style="font-size: 24px; color: #888;">通知</div>
        </div>
      </div>

      <!-- 私信页面 -->
      <div id="x-messages-page" class="x-page"
        style="flex: 1; display: none; flex-direction: column; overflow: hidden; min-height: 0;">
        <div style="flex: 1; display: flex; justify-content: center; align-items: center;">
          <div style="font-size: 24px; color: #888;">私信</div>
        </div>
      </div>

      <!-- 推文评论页面 -->
      <div id="x-comments-page" class="x-page"
        style="flex: 1; display: none; flex-direction: column; overflow: hidden; min-height: 0;">

        <!-- 评论页面顶部栏 -->
        <div class="comments-header"
          style="display: flex; align-items: center; padding: 10px 15px; border-bottom: 1px solid #333;">
          <div class="comments-back-btn" onclick="switchXPage('home')" style="cursor: pointer; margin-right: 15px;">
            <svg viewBox="0 0 24 24" aria-hidden="true" style="width: 20px; height: 20px; fill: #fff;">
              <g>
                <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"></path>
              </g>
            </svg>
          </div>
          <span style="font-size: 20px; font-weight: 700;">发帖</span>
        </div>

        <!-- 评论列表容器 -->
        <div class="comments-container" style="flex: 1; padding: 0; overflow-y: auto; min-height: 0;">
          <!-- 评论将通过JavaScript动态生成在这里 -->
        </div>

        <!-- 评论输入区域 -->
        <div class="comment-input-area" style="border-top: 1px solid #333; padding: 15px; background-color: #000;">
          <div style="display: flex; align-items: flex-start; gap: 12px;">
            <!-- 用户头像 -->
            <img id="comment-user-avatar" src="https://i.postimg.cc/pXxk1JXk/IMG-6442.jpg" alt="Your avatar"
              style="width: 40px; height: 40px; border-radius: 50%; flex-shrink: 0;">

            <!-- 输入框容器 -->
            <div style="flex: 1;">
              <textarea id="comment-input" placeholder="发布你的回复"
                style="width: 100%; min-height: 20px; max-height: 120px; background: transparent; border: none; color: #fff; font-size: 20px; resize: none; outline: none; font-family: inherit; line-height: 1.3;"
                onkeydown="handleCommentInput(event)" oninput="autoResize(this)"></textarea>

              <!-- 输入框底部工具栏 -->
              <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px;">
                <!-- 左侧工具图标 -->
                <div style="display: flex; gap: 15px;">
                  <svg viewBox="0 0 24 24" style="width: 20px; height: 20px; fill: #1d9bf0; cursor: pointer;" onclick="triggerCommentImageUpload()">
                    <g>
                      <path
                        d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z">
                      </path>
                    </g>
                  </svg>
                  <svg viewBox="0 0 24 24" style="width: 20px; height: 20px; fill: #1d9bf0; cursor: pointer; opacity: 0.5;">
                    <g>
                      <path
                        d="M3 5.5C3 4.119 4.12 3 5.5 3h13C19.88 3 21 4.119 21 5.5v13c0 1.381-1.12 2.5-2.5 2.5h-13C4.12 21 3 19.881 3 18.5v-13zM5.5 5c-.28 0-.5.224-.5.5v13c0 .276.22.5.5.5h13c.28 0 .5-.224.5-.5v-13c0-.276-.22-.5-.5-.5h-13zM18 10.711V9.25h-3.74v5.5h1.44v-1.719h1.7V11.57h-1.7v-.859H18zM11.79 9.25h1.44v5.5h-1.44v-5.5zm-3.07 1.375c.34 0 .77.172 1.02.43l1.03-.86c-.51-.601-1.28-.945-2.05-.945C7.19 9.25 6 10.453 6 12s1.19 2.75 2.72 2.75c.77 0 1.54-.344 2.05-.945l-1.03-.86c-.25.258-.68.43-1.02.43-.76 0-1.29-.546-1.29-1.375S8.03 10.625 8.79 10.625z">
                      </path>
                    </g>
                  </svg>
                  <svg viewBox="0 0 24 24" style="width: 20px; height: 20px; fill: #1d9bf0; cursor: pointer; opacity: 0.5;">
                    <g>
                      <path
                        d="M8 9.5C8 8.119 8.672 7 9.5 7S11 8.119 11 9.5 10.328 12 9.5 12 8 10.881 8 9.5zm6.5 2.5c.828 0 1.5-1.119 1.5-2.5S15.328 7 14.5 7 13 8.119 13 9.5s.672 2.5 1.5 2.5zM12 16c-2.224 0-3.021-2.227-3.051-2.316l-1.897.633c.05.15 1.271 3.684 4.949 3.684s4.898-3.533 4.949-3.684l-1.896-.638c-.033.095-.83 2.322-3.053 2.322zm10.25-4.001c0 5.652-4.598 10.25-10.25 10.25S1.75 17.652 1.75 12 6.348 1.75 12 1.75 22.25 6.348 22.25 12zm-2 0c0-4.549-3.701-8.25-8.25-8.25S3.75 7.451 3.75 12s3.701 8.25 8.25 8.25 8.25-3.701 8.25-8.25z">
                      </path>
                    </g>
                  </svg>
                </div>

                <!-- 右侧发送按钮 -->
                <button id="reply-btn" onclick="submitComment()"
                  style="background-color: #1d9bf0; color: #fff; border: none; border-radius: 20px; padding: 8px 20px; font-size: 15px; font-weight: 700; cursor: pointer; opacity: 0.5;"
                  disabled>
                  回复
                </button>
              </div>
              
              <!-- 图片预览区域 -->
              <div id="comment-image-preview" style="display: none; margin-top: 12px; position: relative;">
                <img id="comment-image-preview-img" src="" style="max-width: 200px; max-height: 200px; border-radius: 12px; display: block;">
                <button onclick="removeCommentImage()" 
                  style="position: absolute; top: 4px; right: 4px; background: rgba(0,0,0,0.75); border: none; border-radius: 50%; width: 28px; height: 28px; color: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center;">
                  <svg viewBox="0 0 24 24" style="width: 16px; height: 16px; fill: #fff;">
                    <g><path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path></g>
                  </svg>
                </button>
              </div>
              
              <!-- 隐藏的文件输入 -->
              <input type="file" id="comment-image-input" accept="image/*" style="display: none;" onchange="handleCommentImageUpload(event)">
            </div>
          </div>
        </div>
      </div>

      <!-- X设置页面 -->
      <div id="x-settings-page" class="x-page"
        style="flex: 1; display: none; flex-direction: column; overflow: hidden; min-height: 0;">

        <!-- 设置页面顶部栏 -->
        <div class="settings-header"
          style="display: flex; align-items: center; padding: 10px 15px; border-bottom: 1px solid #333; background-color: #000;">
          <div class="settings-back-btn" onclick="switchXPage('home')" style="cursor: pointer; margin-right: 15px;">
            <svg viewBox="0 0 24 24" aria-hidden="true" style="width: 20px; height: 20px; fill: #fff;">
              <g>
                <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"></path>
              </g>
            </svg>
          </div>
          <span style="font-size: 20px; font-weight: 700; color: #fff;">设置</span>
        </div>

        <!-- 设置内容区域 -->
        <div class="settings-content"
          style="flex: 1; padding: 15px; width: 100%; box-sizing: border-box; overflow-y: auto; min-height: 0;">

          <!-- 提示词设置 -->
          <div class="settings-section" style="margin-bottom: 30px;">
            <label style="display: block; color: #fff; font-size: 17px; font-weight: 600; margin-bottom: 10px;">
              提示词
            </label>
            <textarea id="x-system-prompt" placeholder="输入系统提示词..."
              style="width: 100%; min-height: 120px; background-color: #1a1a1a; border: 1px solid #333; border-radius: 8px; color: #fff; padding: 12px; font-size: 15px; resize: vertical; outline: none; font-family: inherit; line-height: 1.4;"
              onfocus="this.style.borderColor='#1d9bf0'" onblur="this.style.borderColor='#333'"></textarea>
          </div>

          <!-- 世界观设定 -->
          <div class="settings-section" style="margin-bottom: 30px;">
            <label style="display: block; color: #fff; font-size: 17px; font-weight: 600; margin-bottom: 10px;">
              世界观设定
            </label>
            <textarea id="x-world-setting" placeholder="描述角色所在的世界观、背景设定..."
              style="width: 100%; min-height: 100px; background-color: #1a1a1a; border: 1px solid #333; border-radius: 8px; color: #fff; padding: 12px; font-size: 15px; resize: vertical; outline: none; font-family: inherit; line-height: 1.4;"
              onfocus="this.style.borderColor='#1d9bf0'" onblur="this.style.borderColor='#333'"></textarea>
          </div>

          <!-- 角色绑定设置 -->
          <div class="settings-section" style="margin-bottom: 40px;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
              <label style="color: #fff; font-size: 17px; font-weight: 600;">
                绑定角色
              </label>
              <div class="x-toggle" onclick="toggleCharacterBinding()" style="cursor: pointer;">
                <div id="x-character-toggle" class="toggle-switch"
                  style="width: 50px; height: 30px; background-color: #333; border-radius: 15px; position: relative; transition: all 0.3s ease;">
                  <div class="toggle-circle"
                    style="width: 26px; height: 26px; background-color: #fff; border-radius: 50%; position: absolute; top: 2px; left: 2px; transition: all 0.3s ease;">
                  </div>
                </div>
              </div>
            </div>
            <p style="color: #71767b; font-size: 14px; margin: 0 0 15px 0; line-height: 1.4;">
              开启后，绑定的角色可以在X上发布推文
            </p>

            <!-- 角色选择区域 -->
            <div id="character-binding-area" style="display: none;">
              <div style="background-color: #1a1a1a; border: 1px solid #333; border-radius: 12px; padding: 16px;">
                <div style="color: #fff; font-size: 15px; font-weight: 600; margin-bottom: 12px;">选择要绑定的角色</div>
                <div id="characters-list" style="max-height: 300px; overflow-y: auto;">
                  <!-- 角色列表将通过JavaScript动态生成 -->
                </div>
              </div>
            </div>
          </div>

          <!-- NPC绑定设置 -->
          <div class="settings-section" style="margin-bottom: 40px;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
              <label style="color: #fff; font-size: 17px; font-weight: 600;">
                绑定NPC
              </label>
              <div class="x-toggle" onclick="toggleNPCBinding()" style="cursor: pointer;">
                <div id="x-npc-toggle" class="toggle-switch"
                  style="width: 50px; height: 30px; background-color: #333; border-radius: 15px; position: relative; transition: all 0.3s ease;">
                  <div class="toggle-circle"
                    style="width: 26px; height: 26px; background-color: #fff; border-radius: 50%; position: absolute; top: 2px; left: 2px; transition: all 0.3s ease;">
                  </div>
                </div>
              </div>
            </div>
            <p style="color: #71767b; font-size: 14px; margin: 0 0 15px 0; line-height: 1.4;">
              开启后，可以创建和管理自定义NPC，设置其人设、发帖习惯和绑定用户
            </p>

            <!-- NPC管理区域 -->
            <div id="npc-binding-area" style="display: none;">
              <div style="background-color: #1a1a1a; border: 1px solid #333; border-radius: 12px; padding: 16px;">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
                  <div style="color: #fff; font-size: 15px; font-weight: 600;">NPC列表</div>
                  <button onclick="openCreateNPCModal()" style="
                    background-color: #1d9bf0;
                    color: #fff;
                    border: none;
                    border-radius: 20px;
                    padding: 6px 16px;
                    font-size: 14px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s;
                  " onmouseover="this.style.backgroundColor='#1a8cd8'" onmouseout="this.style.backgroundColor='#1d9bf0'">
                    + 创建NPC
                  </button>
                </div>
                <div id="npcs-list" style="max-height: 300px; overflow-y: auto;">
                  <!-- NPC列表将通过JavaScript动态生成 -->
                </div>
              </div>
            </div>
          </div>

          <!-- 按钮区域 -->
          <div class="settings-buttons" style="display: flex; flex-direction: column; gap: 12px;">
            <!-- 保存按钮 -->
            <button onclick="saveXSettings()"
              style="width: 100%; background-color: #1d9bf0; color: #fff; border: none; border-radius: 25px; padding: 12px 24px; font-size: 16px; font-weight: 700; cursor: pointer; transition: all 0.2s;"
              onmouseover="this.style.backgroundColor='#1a8cd8'" onmouseout="this.style.backgroundColor='#1d9bf0'">
              保存设置
            </button>

            <!-- 保存预设按钮 -->
            <button onclick="saveXPreset()"
              style="width: 100%; background-color: #1d9bf0; color: #fff; border: none; border-radius: 25px; padding: 12px 24px; font-size: 16px; font-weight: 700; cursor: pointer; transition: all 0.2s;"
              onmouseover="this.style.backgroundColor='#1a8cd8'" onmouseout="this.style.backgroundColor='#1d9bf0'">
              保存为预设
            </button>

            <!-- 导入导出按钮组 -->
            <div style="display: flex; gap: 12px;">
              <button onclick="importXData()"
                style="flex: 1; background-color: #1d9bf0; color: #fff; border: none; border-radius: 25px; padding: 12px 20px; font-size: 15px; font-weight: 600; cursor: pointer; transition: all 0.2s;"
                onmouseover="this.style.backgroundColor='#1a8cd8'" onmouseout="this.style.backgroundColor='#1d9bf0'">
                导入数据
              </button>
              <button onclick="exportXData()"
                style="flex: 1; background-color: #1d9bf0; color: #fff; border: none; border-radius: 25px; padding: 12px 20px; font-size: 15px; font-weight: 600; cursor: pointer; transition: all 0.2s;"
                onmouseover="this.style.backgroundColor='#1a8cd8'" onmouseout="this.style.backgroundColor='#1d9bf0'">
                导出数据
              </button>
            </div>
          </div>

          <!-- 预设管理区域 -->
          <div class="preset-management" style="margin-top: 40px; padding-top: 30px; border-top: 1px solid #333;">
            <h3 style="color: #fff; font-size: 18px; font-weight: 700; margin-bottom: 15px;">预设管理</h3>
            <div id="x-presets-list" style="display: flex; flex-direction: column;">
              <!-- 预设列表将通过JavaScript动态生成 -->
            </div>
          </div>
        </div>
      </div>

      <!-- 推文详情页面 -->
      <div id="x-tweet-detail-page" class="x-page"
        style="flex: 1; display: none; flex-direction: column; overflow: hidden;">

        <!-- 详情页面顶部栏 -->
        <div class="tweet-detail-header"
          style="display: flex; align-items: center; justify-content: space-between; padding: 10px 15px; border-bottom: 1px solid #333; background-color: rgba(0,0,0,0.8); backdrop-filter: blur(12px); position: sticky; top: 0; z-index: 5;">
          <div style="display: flex; align-items: center;">
            <div class="tweet-detail-back-btn" onclick="switchXPage('home')"
              style="cursor: pointer; margin-right: 15px;">
              <svg viewBox="0 0 24 24" aria-hidden="true" style="width: 20px; height: 20px; fill: #fff;">
                <g>
                  <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"></path>
                </g>
              </svg>
            </div>
            <span style="font-size: 20px; font-weight: 700; color: #fff;">帖子</span>
          </div>

          <!-- 重回按钮 -->
          <div id="reroll-replies-btn" onclick="rerollAIReplies()" style="
             display: flex;
             align-items: center;
             justify-content: center;
             width: 32px;
             height: 32px;
             background-color: transparent;
             border: none;
             border-radius: 50%;
             cursor: pointer;
             transition: all 0.2s;
           " onmouseover="this.style.backgroundColor='rgba(255,255,255,0.1)'"
            onmouseout="this.style.backgroundColor='transparent'">
            <svg viewBox="0 0 24 24" style="width: 20px; height: 20px; fill: #fff;">
              <g>
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </g>
            </svg>
          </div>
        </div>

        <!-- 推文详情内容 -->
        <div class="tweet-detail-content" style="flex: 1; overflow-y: auto;">
          <div id="tweet-detail-container" style="padding: 0;">
            <!-- 推文详情将通过JavaScript动态生成在这里 -->
          </div>

          <!-- 评论区域 -->
          <div style="border-top: 1px solid #2f3336; margin-top: 20px;">
            <!-- 评论输入区域 -->
            <div class="detail-comment-input-area"
              style="border-bottom: 1px solid #333; padding: 15px; background-color: #000;">
              <div style="display: flex; align-items: flex-start; gap: 12px;">
                <!-- 用户头像 -->
                <img id="detail-comment-user-avatar" src="https://i.postimg.cc/pXxk1JXk/IMG-6442.jpg" alt="Your avatar"
                  style="width: 40px; height: 40px; border-radius: 50%; flex-shrink: 0;">

                <!-- 输入框容器 -->
                <div style="flex: 1;">
                  <textarea id="detail-comment-input" placeholder="发布你的回复"
                    style="width: 100%; min-height: 20px; max-height: 120px; background: transparent; border: none; color: #fff; font-size: 20px; resize: none; outline: none; font-family: inherit; line-height: 1.3;"
                    onkeydown="handleDetailCommentInput(event)" oninput="autoResizeDetail(this)"></textarea>

                  <!-- 输入框底部工具栏 -->
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px;">
                    <!-- 左侧工具图标 -->
                    <div style="display: flex; gap: 15px;">
                      <svg viewBox="0 0 24 24" style="width: 20px; height: 20px; fill: #1d9bf0; cursor: pointer;" onclick="triggerDetailCommentImageUpload()">
                        <g>
                          <path
                            d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z">
                          </path>
                        </g>
                      </svg>
                      <svg viewBox="0 0 24 24" style="width: 20px; height: 20px; fill: #1d9bf0; cursor: pointer; opacity: 0.5;">
                        <g>
                          <path
                            d="M3 5.5C3 4.119 4.12 3 5.5 3h13C19.88 3 21 4.119 21 5.5v13c0 1.381-1.12 2.5-2.5 2.5h-13C4.12 21 3 19.881 3 18.5v-13zM5.5 5c-.28 0-.5.224-.5.5v13c0 .276.22.5.5.5h13c.28 0 .5-.224.5-.5v-13c0-.276-.22-.5-.5-.5h-13zM18 10.711V9.25h-3.74v5.5h1.44v-1.719h1.7V11.57h-1.7v-.859H18zM11.79 9.25h1.44v5.5h-1.44v-5.5zm-3.07 1.375c.34 0 .77.172 1.02.43l1.03-.86c-.51-.601-1.28-.945-2.05-.945C7.19 9.25 6 10.453 6 12s1.19 2.75 2.72 2.75c.77 0 1.54-.344 2.05-.945l-1.03-.86c-.25.258-.68.43-1.02.43-.76 0-1.29-.546-1.29-1.375S8.03 10.625 8.79 10.625z">
                          </path>
                        </g>
                      </svg>
                      <svg viewBox="0 0 24 24" style="width: 20px; height: 20px; fill: #1d9bf0; cursor: pointer; opacity: 0.5;">
                        <g>
                          <path
                            d="M8 9.5C8 8.119 8.672 7 9.5 7S11 8.119 11 9.5 10.328 12 9.5 12 8 10.881 8 9.5zm6.5 2.5c.828 0 1.5-1.119 1.5-2.5S15.328 7 14.5 7 13 8.119 13 9.5s.672 2.5 1.5 2.5zM12 16c-2.224 0-3.021-2.227-3.051-2.316l-1.897.633c.05.15 1.271 3.684 4.949 3.684s4.898-3.533 4.949-3.684l-1.896-.638c-.033.095-.83 2.322-3.053 2.322zm10.25-4.001c0 5.652-4.598 10.25-10.25 10.25S1.75 17.652 1.75 12 6.348 1.75 12 1.75 22.25 6.348 22.25 12zm-2 0c0-4.549-3.701-8.25-8.25-8.25S3.75 7.451 3.75 12s3.701 8.25 8.25 8.25 8.25-3.701 8.25-8.25z">
                          </path>
                        </g>
                      </svg>
                    </div>

                    <!-- 右侧发送按钮 -->
                    <button id="detail-reply-btn" onclick="submitDetailComment()"
                      style="background-color: #1d9bf0; color: #fff; border: none; border-radius: 20px; padding: 8px 20px; font-size: 15px; font-weight: 700; cursor: pointer; opacity: 0.5;"
                      disabled>
                      回复
                    </button>
                  </div>
                  
                  <!-- 图片预览区域 -->
                  <div id="detail-comment-image-preview" style="display: none; margin-top: 12px; position: relative;">
                    <img id="detail-comment-image-preview-img" src="" style="max-width: 200px; max-height: 200px; border-radius: 12px; display: block;">
                    <button onclick="removeDetailCommentImage()" 
                      style="position: absolute; top: 4px; right: 4px; background: rgba(0,0,0,0.75); border: none; border-radius: 50%; width: 28px; height: 28px; color: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center;">
                      <svg viewBox="0 0 24 24" style="width: 16px; height: 16px; fill: #fff;">
                        <g><path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path></g>
                      </svg>
                    </button>
                  </div>
                  
                  <!-- 隐藏的文件输入 -->
                  <input type="file" id="detail-comment-image-input" accept="image/*" style="display: none;" onchange="handleDetailCommentImageUpload(event)">
                </div>
              </div>
            </div>

            <!-- 评论列表容器 -->
            <div id="detail-comments-container" style="padding: 0;">
              <!-- 评论将通过JavaScript动态生成在这里 -->
            </div>
          </div>
        </div>
      </div>

      <!-- 用户主页 -->
      <div id="x-profile-page" class="x-page" style="flex: 1; display: none; flex-direction: column; overflow-y: auto;">

        <!-- 主页顶部栏 -->
        <div class="profile-header"
          style="display: flex; align-items: center; padding: 10px 15px; background-color: rgba(0,0,0,0.8); backdrop-filter: blur(12px); position: relative; z-index: 5;">
          <div class="profile-back-btn" onclick="switchXPage('home')" style="cursor: pointer; margin-right: 15px;">
            <svg viewBox="0 0 24 24" aria-hidden="true" style="width: 20px; height: 20px; fill: #fff;">
              <g>
                <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"></path>
              </g>
            </svg>
          </div>
          <div style="flex: 1;">
            <div id="x-profile-header-name" style="font-size: 20px; font-weight: 700; color: #fff;">我</div>
            <div id="x-profile-header-count" style="font-size: 13px; color: #71767b;">0 帖子</div>
          </div>
          <div style="display: flex; gap: 15px;">
            <!-- 提问箱按钮 -->
            <div onclick="switchXPage('askbox')" style="cursor: pointer; padding: 8px; border-radius: 50%; transition: background-color 0.2s;"
              onmouseover="this.style.backgroundColor='rgba(255,255,255,0.1)'"
              onmouseout="this.style.backgroundColor='transparent'"
              title="提问箱">
              <svg viewBox="0 0 24 24" aria-hidden="true" style="width: 20px; height: 20px; fill: #fff;">
                <g>
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </g>
              </svg>
            </div>
            <!-- 更多选项按钮 -->
            <div id="profile-menu-btn" onclick="toggleProfileMenu()"
              style="cursor: pointer; padding: 8px; border-radius: 50%; transition: background-color 0.2s; position: relative;"
              onmouseover="this.style.backgroundColor='rgba(255,255,255,0.1)'"
              onmouseout="this.style.backgroundColor='transparent'">
              <svg viewBox="0 0 24 24" aria-hidden="true" style="width: 20px; height: 20px; fill: #fff;">
                <g>
                  <path
                    d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z">
                  </path>
                </g>
              </svg>
              <!-- 下拉菜单 -->
              <div id="profile-dropdown-menu" style="
                display: none;
                position: absolute;
                top: 100%;
                right: 0;
                background-color: #1a1a1a;
                border: 1px solid #333;
                border-radius: 12px;
                box-shadow: 0 8px 32px rgba(0,0,0,0.3);
                min-width: 200px;
                z-index: 50;
                margin-top: 8px;
                overflow: hidden;
              ">
                <div onclick="openAccountManager()" style="
                  padding: 12px 16px;
                  color: #fff;
                  font-size: 15px;
                  cursor: pointer;
                  transition: background-color 0.2s;
                  display: flex;
                  align-items: center;
                  gap: 12px;
                " onmouseover="this.style.backgroundColor='rgba(255,255,255,0.03)'"
                  onmouseout="this.style.backgroundColor='transparent'">
                  <svg viewBox="0 0 24 24" style="width: 18px; height: 18px; fill: currentColor;">
                    <g>
                      <path
                        d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L19 6.5C18.5 4.4 16.6 2.5 14.5 2L14 0H10L9.5 2C7.4 2.5 5.5 4.4 5 6.5L3 7V9L5 9.5C5.5 11.6 7.4 13.5 9.5 14L10 16H14L14.5 14C16.6 13.5 18.5 11.6 19 9.5L21 9ZM12 8C13.66 8 15 9.34 15 11C15 12.66 13.66 14 12 14C10.34 14 9 12.66 9 11C9 9.34 10.34 8 12 8ZM19 17H5V19H19V17ZM12 20C10.9 20 10 20.9 10 22H14C14 20.9 13.1 20 12 20Z">
                      </path>
                    </g>
                  </svg>
                  账号管理
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 封面图区域 -->
        <div class="cover-section" style="position: relative; height: 140px; background-color: #333;">
          <img id="x-profile-cover-image" src="https://i.postimg.cc/qRzMB6nQ/default-cover.jpg"
            style="width: 100%; height: 100%; object-fit: cover; display: block;" alt="封面图">
        </div>

        <!-- 用户信息区域 -->
        <div class="user-info-section" style="padding: 8px 16px 0; position: relative;">
          <!-- 用户头像 -->
          <div style="position: relative; margin-bottom: 8px;">
            <img id="x-profile-main-avatar" src="https://i.postimg.cc/pXxk1JXk/IMG-6442.jpg"
              style="width: 88px; height: 88px; border-radius: 50%; border: 5px solid #000; position: absolute; top: -44px; left: 0;"
              alt="用户头像">
          </div>

          <!-- 编辑资料按钮 -->
          <div style="display: flex; justify-content: flex-end; margin: 8px 0;">
            <button onclick="editProfile()"
              style="background-color: transparent; color: #fff; border: 1px solid #536471; border-radius: 20px; padding: 6px 16px; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.2s;"
              onmouseover="this.style.backgroundColor='rgba(255,255,255,0.1)'"
              onmouseout="this.style.backgroundColor='transparent'">
              编辑个人资料
            </button>
          </div>

          <!-- 用户名和认证 -->
          <div style="margin-top: 30px; margin-bottom: 4px; padding-left: 8px;">
            <div style="display: flex; align-items: center; gap: 2px; margin-bottom: 0;">
              <span id="x-profile-user-name" style="font-size: 20px; font-weight: 700; color: #fff;">我</span>
              <svg id="x-profile-verified-badge" viewBox="0 0 24 24"
                style="width: 20px; height: 20px; fill: #1d9bf0; display: none;">
                <g>
                  <path
                    d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.27 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.46 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z">
                  </path>
                </g>
              </svg>
            </div>
            <div id="x-profile-user-handle" style="font-size: 15px; color: #71767b; margin-bottom: 10px;">@me</div>
          </div>

          <!-- 个人简介 -->
          <div id="x-profile-bio" style="font-size: 15px; color: #fff; line-height: 1.3; margin-bottom: 10px; padding-left: 8px;">
            欢迎来到我的X主页！
          </div>

          <!-- 自定义标签 -->
          <div class="profile-tags"
            style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px; flex-wrap: wrap; padding-left: 8px;">
            <div style="display: flex; align-items: center; gap: 4px;">
              <span id="x-profile-tag1-icon" style="font-size: 14px;">✨</span>
              <span id="x-profile-tag1" style="color: #71767b; font-size: 14px;">科技爱好者</span>
            </div>
            <div style="display: flex; align-items: center; gap: 4px;">
              <span id="x-profile-tag2-icon" style="font-size: 14px;">📅</span>
              <span id="x-profile-tag2" style="color: #71767b; font-size: 14px;">2024年加入</span>
            </div>
          </div>

          <!-- 关注数据 -->
          <div style="display: flex; gap: 16px; margin-bottom: 12px; padding-left: 8px;">
            <div style="cursor: pointer;" onmouseover="this.querySelector('span').style.textDecoration='underline'"
              onmouseout="this.querySelector('span').style.textDecoration='none'">
              <span id="x-profile-following-count" style="color: #fff; font-weight: 700; font-size: 14px;">156</span>
              <span style="color: #71767b; margin-left: 2px; font-size: 14px; font-weight: 400;">正在关注</span>
            </div>
            <div style="cursor: pointer;" onmouseover="this.querySelector('span').style.textDecoration='underline'"
              onmouseout="this.querySelector('span').style.textDecoration='none'">
              <span id="x-profile-followers-count" style="color: #fff; font-weight: 700; font-size: 14px;">89</span>
              <span style="color: #71767b; margin-left: 2px; font-size: 14px; font-weight: 400;">关注者</span>
            </div>
          </div>
        </div>

        <!-- 标签栏 -->
        <div class="profile-tabs" style="display: flex; border-bottom: 1px solid #2f3336;">
          <div class="profile-tab active" onclick="switchProfileTab('posts')"
            style="flex: 1; text-align: center; padding: 14px 0; font-weight: 600; font-size: 15px; cursor: pointer; position: relative; color: #fff;">
            帖子
            <div class="tab-indicator"
              style="position: absolute; bottom: 0; left: 25%; width: 50%; height: 3px; background-color: #1d9bf0; border-radius: 2px;">
            </div>
          </div>
          <div class="profile-tab" onclick="switchProfileTab('replies')"
            style="flex: 1; text-align: center; padding: 14px 0; font-weight: 500; font-size: 15px; cursor: pointer; position: relative; color: #71767b;">
            回复
            <div class="tab-indicator"
              style="position: absolute; bottom: 0; left: 25%; width: 50%; height: 3px; background-color: #1d9bf0; border-radius: 2px; display: none;">
            </div>
          </div>
          <div class="profile-tab" onclick="switchProfileTab('highlights')"
            style="flex: 1; text-align: center; padding: 14px 0; font-weight: 500; font-size: 15px; cursor: pointer; position: relative; color: #71767b;">
            亮点
            <div class="tab-indicator"
              style="position: absolute; bottom: 0; left: 25%; width: 50%; height: 3px; background-color: #1d9bf0; border-radius: 2px; display: none;">
            </div>
          </div>
          <div class="profile-tab" onclick="switchProfileTab('articles')"
            style="flex: 1; text-align: center; padding: 14px 0; font-weight: 500; font-size: 15px; cursor: pointer; position: relative; color: #71767b;">
            文章
            <div class="tab-indicator"
              style="position: absolute; bottom: 0; left: 25%; width: 50%; height: 3px; background-color: #1d9bf0; border-radius: 2px; display: none;">
            </div>
          </div>
          <div class="profile-tab" onclick="switchProfileTab('media')"
            style="flex: 1; text-align: center; padding: 14px 0; font-weight: 500; font-size: 15px; cursor: pointer; position: relative; color: #71767b;">
            媒体
            <div class="tab-indicator"
              style="position: absolute; bottom: 0; left: 25%; width: 50%; height: 3px; background-color: #1d9bf0; border-radius: 2px; display: none;">
            </div>
          </div>
        </div>

        <!-- 内容区域 -->
        <div class="profile-content" style="flex: 1;">
          <!-- 帖子内容 -->
          <div id="profile-posts-content" class="profile-tab-content" style="display: block;">
            <div id="x-profile-tweets-container" style="padding: 0;">
              <!-- 用户的推文将在这里显示 -->
            </div>
          </div>

          <!-- 其他标签内容 -->
          <div id="profile-replies-content" class="profile-tab-content" style="display: none;">
            <div style="padding: 60px 32px; text-align: center;">
              <div style="color: #71767b; font-size: 31px; font-weight: 800; margin-bottom: 8px;">还没有回复</div>
              <div style="color: #71767b; font-size: 15px;">当你回复一条推文时，它会显示在这里。</div>
            </div>
          </div>

          <div id="profile-highlights-content" class="profile-tab-content" style="display: none;">
            <div style="padding: 60px 32px; text-align: center;">
              <div style="color: #71767b; font-size: 31px; font-weight: 800; margin-bottom: 8px;">还没有亮点</div>
              <div style="color: #71767b; font-size: 15px;">点赞最多的推文会显示在这里。</div>
            </div>
          </div>

          <div id="profile-articles-content" class="profile-tab-content" style="display: none;">
            <div style="padding: 60px 32px; text-align: center;">
              <div style="color: #71767b; font-size: 31px; font-weight: 800; margin-bottom: 8px;">还没有文章</div>
              <div style="color: #71767b; font-size: 15px;">发布的文章会显示在这里。</div>
            </div>
          </div>

          <div id="profile-media-content" class="profile-tab-content" style="display: none;">
            <div style="padding: 60px 32px; text-align: center;">
              <div style="color: #71767b; font-size: 31px; font-weight: 800; margin-bottom: 8px;">还没有媒体</div>
              <div style="color: #71767b; font-size: 15px;">包含照片和视频的推文会显示在这里。</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 编辑个人资料弹窗 -->
    <div id="edit-profile-modal" class="profile-modal" onclick="closeEditProfileModal(event)" style="
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(91, 112, 131, 0.4);
      z-index: 20;
      overflow-y: auto;
    ">
      <div class="modal-content" onclick="event.stopPropagation()" style="
        background-color: #000;
        margin: 40px auto;
        border-radius: 16px;
        max-width: 600px;
        width: calc(100% - 40px);
        max-height: calc(100vh - 80px);
        position: relative;
        overflow: hidden;
      ">
        <!-- 弹窗顶部栏 -->
        <div class="modal-header" style="
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          border-bottom: 1px solid #2f3336;
          position: sticky;
          top: 0;
          background-color: #000;
          z-index: 25;
        ">
          <div style="display: flex; align-items: center; gap: 24px;">
            <!-- 关闭按钮 -->
            <div class="modal-close-btn" onclick="closeEditProfileModal()" style="
              cursor: pointer;
              padding: 8px;
              border-radius: 50%;
              transition: background-color 0.2s;
            " onmouseover="this.style.backgroundColor='rgba(239,243,244,0.1)'"
              onmouseout="this.style.backgroundColor='transparent'">
              <svg viewBox="0 0 24 24" style="width: 20px; height: 20px; fill: #fff;">
                <g>
                  <path
                    d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z">
                  </path>
                </g>
              </svg>
            </div>
            <!-- 标题 -->
            <h2 style="
              color: #fff;
              font-size: 20px;
              font-weight: 700;
              margin: 0;
            ">编辑个人资料</h2>
          </div>
          <!-- 保存按钮 -->
          <button id="save-profile-btn" onclick="saveProfileChanges()" style="
            background-color: #fff;
            color: #000;
            border: none;
            border-radius: 20px;
            padding: 6px 16px;
            font-size: 15px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s;
          " onmouseover="this.style.backgroundColor='#d7dbdc'" onmouseout="this.style.backgroundColor='#fff'">
            保存
          </button>
        </div>

        <!-- 弹窗内容区域 -->
        <div class="modal-body" style="
          padding: 0;
          overflow-y: auto;
          max-height: calc(100vh - 140px);
        ">
          <!-- 封面图编辑区域 -->
          <div class="edit-cover-section" style="
            position: relative;
            height: 200px;
            background-color: #333;
            overflow: hidden;
          ">
            <img id="edit-cover-image" src="https://i.postimg.cc/qRzMB6nQ/default-cover.jpg"
              style="width: 100%; height: 100%; object-fit: cover;" alt="封面图">

            <!-- 封面图编辑按钮 -->
            <div class="cover-edit-overlay" style="
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background-color: rgba(0, 0, 0, 0.4);
              display: flex;
              justify-content: center;
              align-items: center;
              gap: 12px;
            ">
              <!-- 编辑按钮 -->
              <div class="cover-edit-btn" onclick="editCoverImage()" style="
                background-color: rgba(0, 0, 0, 0.75);
                border-radius: 50%;
                padding: 12px;
                cursor: pointer;
                transition: background-color 0.2s;
              " onmouseover="this.style.backgroundColor='rgba(0,0,0,0.85)'"
                onmouseout="this.style.backgroundColor='rgba(0,0,0,0.75)'">
                <svg viewBox="0 0 24 24" style="width: 22px; height: 22px; fill: #fff;">
                  <g>
                    <path
                      d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z">
                    </path>
                  </g>
                </svg>
              </div>
              <!-- 删除按钮 -->
              <div class="cover-remove-btn" onclick="removeCoverImage()" style="
                background-color: rgba(0, 0, 0, 0.75);
                border-radius: 50%;
                padding: 12px;
                cursor: pointer;
                transition: background-color 0.2s;
              " onmouseover="this.style.backgroundColor='rgba(0,0,0,0.85)'"
                onmouseout="this.style.backgroundColor='rgba(0,0,0,0.75)'">
                <svg viewBox="0 0 24 24" style="width: 22px; height: 22px; fill: #fff;">
                  <g>
                    <path
                      d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z">
                    </path>
                  </g>
                </svg>
              </div>
            </div>
          </div>

          <!-- 头像编辑区域 -->
          <div class="edit-avatar-section" style="
            padding: 12px 16px;
            position: relative;
            margin-top: -67px;
            z-index: 3;
          ">
            <div style="position: relative; width: 134px;">
              <img id="edit-main-avatar" src="https://i.postimg.cc/pXxk1JXk/IMG-6442.jpg"
                style="width: 134px; height: 134px; border-radius: 50%; border: 4px solid #000;" alt="用户头像">

              <!-- 头像编辑按钮 -->
              <div class="avatar-edit-btn" onclick="editAvatarImage()" style="
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background-color: rgba(0, 0, 0, 0.75);
                border-radius: 50%;
                padding: 12px;
                cursor: pointer;
                transition: background-color 0.2s;
              " onmouseover="this.style.backgroundColor='rgba(0,0,0,0.85)'"
                onmouseout="this.style.backgroundColor='rgba(0,0,0,0.75)'">
                <svg viewBox="0 0 24 24" style="width: 22px; height: 22px; fill: #fff;">
                  <g>
                    <path
                      d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z">
                    </path>
                  </g>
                </svg>
              </div>
            </div>
          </div>

          <!-- 表单输入区域 -->
          <div class="edit-form-section" style="padding: 24px 16px;">
            <!-- 用户名输入 -->
            <div class="form-group" style="margin-bottom: 20px;">
              <label style="
                display: block;
                color: #8b98a5;
                font-size: 13px;
                font-weight: 400;
                margin-bottom: 2px;
              ">名称</label>
              <input type="text" id="edit-user-name" placeholder="名称" style="
                width: 100%;
                background-color: transparent;
                border: 1px solid #333;
                border-radius: 4px;
                color: #fff;
                padding: 12px;
                font-size: 17px;
                outline: none;
                transition: border-color 0.2s;
                box-sizing: border-box;
              " onfocus="this.style.borderColor='#1d9bf0'" onblur="this.style.borderColor='#333'" maxlength="50"
                oninput="updateCharacterCounts()">
              <div style="color: #8b98a5; font-size: 13px; margin-top: 4px;">0 / 50</div>
            </div>

            <!-- 用户句柄输入 -->
            <div class="form-group" style="margin-bottom: 20px;">
              <label style="
                display: block;
                color: #8b98a5;
                font-size: 13px;
                font-weight: 400;
                margin-bottom: 2px;
              ">用户名</label>
              <input type="text" id="edit-user-handle" placeholder="用户名" style="
                width: 100%;
                background-color: transparent;
                border: 1px solid #333;
                border-radius: 4px;
                color: #fff;
                padding: 12px;
                font-size: 17px;
                outline: none;
                transition: border-color 0.2s;
                box-sizing: border-box;
              " onfocus="this.style.borderColor='#1d9bf0'" onblur="this.style.borderColor='#333'" maxlength="15"
                oninput="updateCharacterCounts()">
              <div style="color: #8b98a5; font-size: 13px; margin-top: 4px;">0 / 15</div>
            </div>

            <!-- 个人简介输入 -->
            <div class="form-group" style="margin-bottom: 20px;">
              <label style="
                display: block;
                color: #8b98a5;
                font-size: 13px;
                font-weight: 400;
                margin-bottom: 2px;
              ">自我介绍</label>
              <textarea id="edit-user-bio" placeholder="自我介绍" style="
                width: 100%;
                background-color: transparent;
                border: 1px solid #333;
                border-radius: 4px;
                color: #fff;
                padding: 12px;
                font-size: 17px;
                outline: none;
                transition: border-color 0.2s;
                box-sizing: border-box;
                resize: vertical;
                min-height: 80px;
                max-height: 150px;
                font-family: inherit;
                line-height: 1.3;
              " onfocus="this.style.borderColor='#1d9bf0'" onblur="this.style.borderColor='#333'" maxlength="160"
                oninput="updateCharacterCounts()"></textarea>
              <div style="color: #8b98a5; font-size: 13px; margin-top: 4px;">0 / 160</div>
            </div>

            <!-- 自定义标签1 -->
            <div class="form-group" style="margin-bottom: 25px;">
              <label style="
                display: block;
                color: #8b98a5;
                font-size: 13px;
                font-weight: 400;
                margin-bottom: 8px;
              ">自定义标签1</label>

              <!-- 图标和文本输入行 -->
              <div style="display: flex; gap: 8px; margin-bottom: 8px;">
                <!-- 图标输入 -->
                <input type="text" id="edit-tag1-icon" placeholder="✨" maxlength="2" style="
                  width: 50px;
                  background-color: transparent;
                  border: 1px solid #333;
                  border-radius: 4px;
                  color: #fff;
                  padding: 12px;
                  font-size: 17px;
                  outline: none;
                  transition: border-color 0.2s;
                  box-sizing: border-box;
                  text-align: center;
                " onfocus="this.style.borderColor='#1d9bf0'" onblur="this.style.borderColor='#333'">

                <!-- 文本输入 -->
                <input type="text" id="edit-custom-tag1" placeholder="例如：科技爱好者" style="
                  flex: 1;
                  background-color: transparent;
                  border: 1px solid #333;
                  border-radius: 4px;
                  color: #fff;
                  padding: 12px;
                  font-size: 17px;
                  outline: none;
                  transition: border-color 0.2s;
                  box-sizing: border-box;
                " onfocus="this.style.borderColor='#1d9bf0'" onblur="this.style.borderColor='#333'" maxlength="30"
                  oninput="updateCharacterCounts()">
              </div>

              <!-- 颜色选择行 -->
              <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 4px;">
                <label style="color: #8b98a5; font-size: 12px; min-width: 40px;">颜色:</label>
                <input type="color" id="edit-tag1-color" value="#71767b" style="
                  width: 40px;
                  height: 32px;
                  border: 1px solid #333;
                  border-radius: 4px;
                  background: transparent;
                  cursor: pointer;
                  outline: none;
                " onchange="updateTag1ColorFromPicker()">
                <input type="text" id="edit-tag1-color-text" placeholder="#71767b" maxlength="7" style="
                  flex: 1;
                  background-color: transparent;
                  border: 1px solid #333;
                  border-radius: 4px;
                  color: #fff;
                  padding: 8px 12px;
                  font-size: 14px;
                  outline: none;
                  font-family: monospace;
                  transition: border-color 0.2s;
                " onfocus="this.style.borderColor='#1d9bf0'" onblur="this.style.borderColor='#333'"
                  oninput="updateTag1ColorFromText()" onchange="updateTag1ColorFromText()">
              </div>

              <div style="color: #8b98a5; font-size: 13px;">0 / 30</div>
            </div>

            <!-- 自定义标签2 -->
            <div class="form-group" style="margin-bottom: 25px;">
              <label style="
                display: block;
                color: #8b98a5;
                font-size: 13px;
                font-weight: 400;
                margin-bottom: 8px;
              ">自定义标签2</label>

              <!-- 图标和文本输入行 -->
              <div style="display: flex; gap: 8px; margin-bottom: 8px;">
                <!-- 图标输入 -->
                <input type="text" id="edit-tag2-icon" placeholder="📅" maxlength="2" style="
                  width: 50px;
                  background-color: transparent;
                  border: 1px solid #333;
                  border-radius: 4px;
                  color: #fff;
                  padding: 12px;
                  font-size: 17px;
                  outline: none;
                  transition: border-color 0.2s;
                  box-sizing: border-box;
                  text-align: center;
                " onfocus="this.style.borderColor='#1d9bf0'" onblur="this.style.borderColor='#333'">

                <!-- 文本输入 -->
                <input type="text" id="edit-custom-tag2" placeholder="例如：2024年加入" style="
                  flex: 1;
                  background-color: transparent;
                  border: 1px solid #333;
                  border-radius: 4px;
                  color: #fff;
                  padding: 12px;
                  font-size: 17px;
                  outline: none;
                  transition: border-color 0.2s;
                  box-sizing: border-box;
                " onfocus="this.style.borderColor='#1d9bf0'" onblur="this.style.borderColor='#333'" maxlength="30"
                  oninput="updateCharacterCounts()">
              </div>

              <!-- 颜色选择行 -->
              <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 4px;">
                <label style="color: #8b98a5; font-size: 12px; min-width: 40px;">颜色:</label>
                <input type="color" id="edit-tag2-color" value="#71767b" style="
                  width: 40px;
                  height: 32px;
                  border: 1px solid #333;
                  border-radius: 4px;
                  background: transparent;
                  cursor: pointer;
                  outline: none;
                " onchange="updateTag2ColorFromPicker()">
                <input type="text" id="edit-tag2-color-text" placeholder="#71767b" maxlength="7" style="
                  flex: 1;
                  background-color: transparent;
                  border: 1px solid #333;
                  border-radius: 4px;
                  color: #fff;
                  padding: 8px 12px;
                  font-size: 14px;
                  outline: none;
                  font-family: monospace;
                  transition: border-color 0.2s;
                " onfocus="this.style.borderColor='#1d9bf0'" onblur="this.style.borderColor='#333'"
                  oninput="updateTag2ColorFromText()" onchange="updateTag2ColorFromText()">
              </div>

              <div style="color: #8b98a5; font-size: 13px;">0 / 30</div>
            </div>

            <!-- 关注数输入 -->
            <div class="form-group" style="margin-bottom: 20px;">
              <label style="
                display: block;
                color: #8b98a5;
                font-size: 13px;
                font-weight: 400;
                margin-bottom: 2px;
              ">正在关注数量</label>
              <input type="text" id="edit-following-count" placeholder="156, 1.2K, 2.5M等" maxlength="20" style="
                width: 100%;
                background-color: transparent;
                border: 1px solid #333;
                border-radius: 4px;
                color: #fff;
                padding: 12px;
                font-size: 17px;
                outline: none;
                transition: border-color 0.2s;
                box-sizing: border-box;
              " onfocus="this.style.borderColor='#1d9bf0'" onblur="this.style.borderColor='#333'">
              <div style="color: #8b98a5; font-size: 13px; margin-top: 4px;">可输入任意数字、字母、符号组合</div>
            </div>

            <!-- 关注者数输入 -->
            <div class="form-group" style="margin-bottom: 20px;">
              <label style="
                display: block;
                color: #8b98a5;
                font-size: 13px;
                font-weight: 400;
                margin-bottom: 2px;
              ">关注者数量</label>
              <input type="text" id="edit-followers-count" placeholder="89, 1.5K, 3.2M等" maxlength="20" style="
                width: 100%;
                background-color: transparent;
                border: 1px solid #333;
                border-radius: 4px;
                color: #fff;
                padding: 12px;
                font-size: 17px;
                outline: none;
                transition: border-color 0.2s;
                box-sizing: border-box;
              " onfocus="this.style.borderColor='#1d9bf0'" onblur="this.style.borderColor='#333'">
              <div style="color: #8b98a5; font-size: 13px; margin-top: 4px;">可输入任意数字、字母、符号组合</div>
            </div>

            <!-- 认证类型设置 -->
            <div class="form-group" style="margin-bottom: 25px;">
              <label style="
                display: block;
                color: #8b98a5;
                font-size: 13px;
                font-weight: 400;
                margin-bottom: 8px;
              ">认证类型</label>

              <div style="color: #71767b; font-size: 12px; margin-bottom: 12px; line-height: 1.4;">
                选择您的认证类型，不同认证类型会显示不同的图标和含义。
              </div>

              <!-- 认证类型选择 -->
              <div style="margin-bottom: 12px;">
                <select id="edit-verification-type" style="
                  width: 100%;
                  background-color: #000;
                  border: 1px solid #333;
                  border-radius: 4px;
                  color: #fff;
                  padding: 12px;
                  font-size: 17px;
                  outline: none;
                  transition: border-color 0.2s;
                  box-sizing: border-box;
                " onfocus="this.style.borderColor='#1d9bf0'" onblur="this.style.borderColor='#333'"
                  onchange="updateVerificationTypeUI()">
                  <option value="none" style="background-color: #000; color: #fff;">无认证</option>
                  <option value="verified" style="background-color: #000; color: #fff;">已认证 - 蓝色勾标</option>
                  <option value="couple" style="background-color: #000; color: #fff;">情侣认证 - 白色心形</option>
                  <option value="married" style="background-color: #000; color: #fff;">已婚认证 - 白色圆环</option>
                  <option value="vip" style="background-color: #000; color: #fff;">VIP认证 - 白色菱形</option>
                </select>
              </div>

              <!-- 情侣认证角色绑定 -->
              <div id="couple-binding-section" style="display: none;">
                <label style="
                  display: block;
                  color: #8b98a5;
                  font-size: 13px;
                  font-weight: 400;
                  margin-bottom: 8px;
                ">情侣对象角色</label>

                <div style="color: #71767b; font-size: 12px; margin-bottom: 8px; line-height: 1.4;">
                  选择与您是情侣关系的角色。绑定后，其他推特观众都会知道你们的情侣关系。
                </div>

                <select id="edit-couple-character" style="
                  width: 100%;
                  background-color: #000;
                  border: 1px solid #333;
                  border-radius: 4px;
                  color: #fff;
                  padding: 12px;
                  font-size: 17px;
                  outline: none;
                  transition: border-color 0.2s;
                  box-sizing: border-box;
                " onfocus="this.style.borderColor='#1d9bf0'" onblur="this.style.borderColor='#333'">
                  <option value="" style="background-color: #000; color: #fff;">未选择角色</option>
                  <!-- 角色选项将动态生成 -->
                </select>
              </div>
            </div>

            <!-- 公众身份设置 -->
            <div class="form-group" style="margin-bottom: 25px;">
              <label style="
                display: block;
                color: #8b98a5;
                font-size: 13px;
                font-weight: 400;
                margin-bottom: 8px;
              ">公众身份</label>
              <div style="color: #71767b; font-size: 12px; margin-bottom: 8px; line-height: 1.4;">
                描述您在X平台的公众身份（如明星、网红、博主等）。这将影响其他用户对您的讨论几率，身份越知名可能引起更多关注和讨论。此信息完全公开。
              </div>

              <!-- 重要提醒 -->
              <div
                style="background-color: rgba(29, 155, 240, 0.1); border: 1px solid #1d9bf0; border-radius: 6px; padding: 12px; margin-bottom: 12px;">
                <div style="color: #1d9bf0; font-size: 12px; line-height: 1.4;">
                  <strong>📌 重要提醒：</strong>您将以完整身份进行互动，但<strong
                    style="color: #1d9bf0;">X平台其他用户无法读取您的个人设定</strong>，仅能看到此公众身份信息。如需让其他用户了解的个人特点、背景经历等内容，请全部详细填写至公众身份中。
                </div>
              </div>

              <textarea id="edit-public-identity" placeholder="例如：知名科技博主、演员、歌手、网络红人等... 可详细描述您的公开背景、成就、特点等，无字数限制" style="
                width: 100%;
                background-color: transparent;
                border: 1px solid #333;
                border-radius: 4px;
                color: #fff;
                padding: 12px;
                font-size: 17px;
                outline: none;
                transition: border-color 0.2s;
                box-sizing: border-box;
                resize: vertical;
                min-height: 120px;
                max-height: 200px;
                font-family: inherit;
                line-height: 1.3;
              " onfocus="this.style.borderColor='#1d9bf0'" onblur="this.style.borderColor='#333'"></textarea>
              <div style="color: #8b98a5; font-size: 12px; margin-top: 4px;">💡 无字数限制，可详细描述您的公开信息</div>
            </div>

            <!-- 真名公开设置 -->
            <div class="form-group" style="margin-bottom: 25px;">
              <label style="
                display: block;
                color: #8b98a5;
                font-size: 13px;
                font-weight: 400;
                margin-bottom: 8px;
              ">真名设置</label>
              <div style="color: #71767b; font-size: 12px; margin-bottom: 12px; line-height: 1.4;">
                选择是否公开您的真实姓名。公开后，其他用户和角色都能看到您的真名，情侣认证时也会显示双方真名。
              </div>

              <!-- 是否公开真名复选框 -->
              <div style="margin-bottom: 12px;">
                <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                  <input type="checkbox" id="edit-show-real-name" style="
                    width: 16px;
                    height: 16px;
                    accent-color: #1d9bf0;
                  " onchange="toggleRealNameInput()">
                  <span style="color: #fff; font-size: 15px;">公开真实姓名</span>
                </label>
              </div>

              <!-- 真名输入框 -->
              <div id="real-name-input-container" style="display: none;">
                <input type="text" id="edit-real-name" placeholder="请输入您的真实姓名" style="
                  width: 100%;
                  background-color: transparent;
                  border: 1px solid #333;
                  border-radius: 4px;
                  color: #fff;
                  padding: 12px;
                  font-size: 17px;
                  outline: none;
                  transition: border-color 0.2s;
                  box-sizing: border-box;
                " onfocus="this.style.borderColor='#1d9bf0'" onblur="this.style.borderColor='#333'" maxlength="50"
                  oninput="updateCharacterCounts()">
                <div style="color: #8b98a5; font-size: 13px; margin-top: 4px;">0 / 50</div>
              </div>
            </div>

            <!-- 角色身份识别设置 -->
            <div class="form-group" style="margin-bottom: 20px;">
              <label style="
                display: block;
                color: #8b98a5;
                font-size: 13px;
                font-weight: 400;
                margin-bottom: 8px;
              ">角色身份识别</label>
              <div style="color: #71767b; font-size: 12px; margin-bottom: 12px; line-height: 1.4;">
                选择哪些角色知道您的真实身份。被选中的角色会认识您，在互动时会表现得像朋友一样。
                <br><br>
                <strong style="color: #1d9bf0;">功能说明：</strong><br>
                • 知道您身份的角色会在评论区与您自然互动<br>
                • 您发帖时，这些角色可能会来留言<br>
                • 只有已绑定X资料的角色才能被选择<br>
                • <strong style="color: #1d9bf0;">点击右侧按钮</strong>可设置专属的用户人设<br>
                • 🔵 蓝色<strong>+</strong>按钮：未设置 | 🟢 绿色<strong>✏️</strong>按钮：已设置
              </div>

              <!-- 角色选择列表 -->
              <div id="identity-characters-list" style="
                background-color: #1a1a1a;
                border: 1px solid #333;
                border-radius: 8px;
                padding: 12px;
                max-height: 200px;
                overflow-y: auto;
              ">
                <!-- 角色列表将动态生成 -->
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

    <!-- 发帖弹窗 -->
    <div id="compose-tweet-modal" class="compose-modal" onclick="closeComposeTweetModal(event)" style="
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(91, 112, 131, 0.4);
      z-index: 20;
      overflow-y: auto;
    ">
      <div class="compose-modal-content" onclick="event.stopPropagation()" style="
        background-color: #000;
        margin: 40px auto;
        border-radius: 16px;
        max-width: 600px;
        width: calc(100% - 40px);
        max-height: calc(100vh - 80px);
        position: relative;
        overflow: hidden;
      ">
        <!-- 发帖弹窗顶部栏 -->
        <div class="compose-header" style="
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          border-bottom: 1px solid #2f3336;
          position: sticky;
          top: 0;
          background-color: #000;
          z-index: 25;
        ">
          <div style="display: flex; align-items: center; gap: 24px;">
            <!-- 关闭按钮 -->
            <div class="compose-close-btn" onclick="closeComposeTweetModal()" style="
              cursor: pointer;
              padding: 8px;
              border-radius: 50%;
              transition: background-color 0.2s;
            " onmouseover="this.style.backgroundColor='rgba(239,243,244,0.1)'"
              onmouseout="this.style.backgroundColor='transparent'">
              <svg viewBox="0 0 24 24" style="width: 20px; height: 20px; fill: #fff;">
                <g>
                  <path
                    d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z">
                  </path>
                </g>
              </svg>
            </div>
          </div>
          <!-- 发帖按钮 -->
          <button id="compose-tweet-btn" onclick="publishTweet()" disabled style="
            background-color: #1d9bf0;
            color: #fff;
            border: none;
            border-radius: 20px;
            padding: 8px 20px;
            font-size: 15px;
            font-weight: 700;
            cursor: pointer;
            opacity: 0.5;
            transition: all 0.2s;
          ">
            发帖
          </button>
        </div>

        <!-- 发帖弹窗内容区域 -->
        <div class="compose-body" style="
          padding: 16px;
          overflow-y: auto;
          max-height: calc(100vh - 200px);
        ">
          <!-- 用户信息和输入区域 -->
          <div style="display: flex; gap: 12px; margin-bottom: 20px;">
            <!-- 用户头像 -->
            <img id="compose-user-avatar" src="https://i.postimg.cc/pXxk1JXk/IMG-6442.jpg" alt="用户头像"
              style="width: 48px; height: 48px; border-radius: 50%; flex-shrink: 0;">

            <!-- 输入区域 -->
            <div style="flex: 1; min-width: 0;">
              <!-- 主要文本输入 -->
              <textarea id="compose-text-input" placeholder="有什么新鲜事？" style="
                width: 100%;
                min-height: 120px;
                max-height: 300px;
                background: transparent;
                border: none;
                color: #fff;
                font-size: 20px;
                resize: none;
                outline: none;
                font-family: inherit;
                line-height: 1.3;
                box-sizing: border-box;
              " oninput="handleComposeInput()" onkeyup="processHashtagsAndMentions()"></textarea>

              <!-- 引用内容显示区域 -->
              <div id="quote-content-preview"
                style="display: none; margin-top: 16px; border: 1px solid #2f3336; border-radius: 16px; padding: 12px; background-color: rgba(0,0,0,0.3);">
                <div
                  style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                  <div style="display: flex; align-items: center; gap: 4px;">
                    <svg viewBox="0 0 24 24" style="width: 16px; height: 16px; fill: #71767b;">
                      <g>
                        <path
                          d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.791-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.791 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z">
                        </path>
                      </g>
                    </svg>
                    <span id="quote-type-text" style="color: #71767b; font-size: 13px;">引用推文</span>
                  </div>
                  <div onclick="removeQuoteContent()"
                    style="cursor: pointer; padding: 4px; border-radius: 50%; transition: background-color 0.2s;"
                    onmouseover="this.style.backgroundColor='rgba(239,243,244,0.1)'"
                    onmouseout="this.style.backgroundColor='transparent'">
                    <svg viewBox="0 0 24 24" style="width: 16px; height: 16px; fill: #71767b;">
                      <g>
                        <path
                          d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z">
                        </path>
                      </g>
                    </svg>
                  </div>
                </div>
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                  <img id="quote-user-avatar" style="width: 20px; height: 20px; border-radius: 50%;" alt="用户头像">
                  <span id="quote-user-name" style="font-weight: 600; color: #fff; font-size: 13px;"></span>
                  <svg id="quote-user-verified" viewBox="0 0 24 24"
                    style="width: 14px; height: 14px; fill: #1d9bf0; display: none;">
                    <g>
                      <path
                        d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.27 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.46 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z">
                      </path>
                    </g>
                  </svg>
                  <span id="quote-user-handle" style="color: #71767b; font-size: 13px;"></span>
                  <span id="quote-user-time" style="color: #71767b; font-size: 13px;"></span>
                </div>
                <div id="quote-content-text"
                  style="color: #fff; font-size: 14px; line-height: 1.3; word-wrap: break-word;"></div>
                <!-- 引用图片容器 -->
                <div id="quote-image-container" style="display: none;"></div>
              </div>

              <!-- 字符计数 -->
              <div style="display: flex; justify-content: flex-end; margin-top: 8px;">
                <div id="compose-char-count" style="
                  color: #71767b;
                  font-size: 13px;
                ">0 / 280</div>
              </div>

              <!-- 功能区域 -->
              <div style="margin-top: 16px;">

                <!-- 图片区域 -->
                <div id="compose-image-section" style="display: none; margin-bottom: 16px;">
                  <div style="background-color: #1a1a1a; border: 1px solid #333; border-radius: 12px; padding: 16px;">
                    <div style="color: #fff; font-size: 15px; font-weight: 600; margin-bottom: 12px;">添加图片</div>

                    <!-- 图片选择方式 -->
                    <div style="display: flex; gap: 12px; margin-bottom: 16px;">
                      <button onclick="selectImageMethod('description')" id="img-desc-btn" style="
                        flex: 1;
                        background-color: #333;
                        color: #fff;
                        border: 1px solid #536471;
                        border-radius: 8px;
                        padding: 8px 12px;
                        font-size: 13px;
                        cursor: pointer;
                        transition: all 0.2s;
                      ">文字描述</button>
                      <button onclick="selectImageMethod('upload')" id="img-upload-btn" style="
                        flex: 1;
                        background-color: #333;
                        color: #fff;
                        border: 1px solid #536471;
                        border-radius: 8px;
                        padding: 8px 12px;
                        font-size: 13px;
                        cursor: pointer;
                        transition: all 0.2s;
                      ">本地上传</button>
                    </div>

                    <!-- 文字描述输入 -->
                    <div id="image-description-input" style="display: none;">
                      <textarea placeholder="描述图片内容..." style="
                        width: 100%;
                        min-height: 80px;
                        background-color: #000;
                        border: 1px solid #333;
                        border-radius: 8px;
                        color: #fff;
                        padding: 12px;
                        font-size: 15px;
                        resize: vertical;
                        outline: none;
                        font-family: inherit;
                        box-sizing: border-box;
                      " onfocus="this.style.borderColor='#1d9bf0'" onblur="this.style.borderColor='#333'"></textarea>
                    </div>

                    <!-- 本地上传区域 -->
                    <div id="image-upload-area" style="display: none;">
                      <div style="
                        border: 2px dashed #333;
                        border-radius: 8px;
                        padding: 20px;
                        text-align: center;
                        cursor: pointer;
                        transition: all 0.2s;
                      " onclick="triggerImageUpload()" onmouseover="this.style.borderColor='#1d9bf0'"
                        onmouseout="this.style.borderColor='#333'">
                        <svg viewBox="0 0 24 24" style="width: 32px; height: 32px; fill: #71767b; margin-bottom: 8px;">
                          <g>
                            <path
                              d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z">
                            </path>
                          </g>
                        </svg>
                        <div style="color: #71767b; font-size: 15px;">点击选择图片文件</div>
                        <div style="color: #71767b; font-size: 13px; margin-top: 4px;">支持 JPG、PNG、GIF，最大 5MB</div>
                      </div>
                      <input type="file" id="image-file-input" accept="image/*" style="display: none;"
                        onchange="handleImageUpload(event)">
                      <div id="uploaded-image-preview" style="display: none; margin-top: 12px;">
                        <img id="preview-image"
                          style="width: 100%; max-height: 200px; object-fit: cover; border-radius: 8px;" alt="预览图片">
                      </div>
                    </div>

                    <!-- 操作按钮 -->
                    <div style="display: flex; gap: 8px; margin-top: 12px;">
                      <button onclick="saveImageData()" style="
                        flex: 1;
                        background-color: #1d9bf0;
                        color: #fff;
                        border: none;
                        border-radius: 8px;
                        padding: 8px;
                        font-size: 13px;
                        cursor: pointer;
                        transition: all 0.2s;
                      " onmouseover="this.style.backgroundColor='#1a8cd8'"
                        onmouseout="this.style.backgroundColor='#1d9bf0'">
                        保存图片
                      </button>
                      <button onclick="removeImage()" style="
                        flex: 1;
                        background-color: transparent;
                        color: #f4212e;
                        border: 1px solid #f4212e;
                        border-radius: 8px;
                        padding: 8px;
                        font-size: 13px;
                        cursor: pointer;
                        transition: all 0.2s;
                      " onmouseover="this.style.backgroundColor='rgba(244,33,46,0.1)'"
                        onmouseout="this.style.backgroundColor='transparent'">
                        移除图片
                      </button>
                    </div>
                  </div>
                </div>

                <!-- 定位区域 -->
                <div id="compose-location-section" style="display: none; margin-bottom: 16px;">
                  <div style="background-color: #1a1a1a; border: 1px solid #333; border-radius: 12px; padding: 16px;">
                    <div style="color: #fff; font-size: 15px; font-weight: 600; margin-bottom: 12px;">添加位置</div>
                    <input type="text" id="location-input" placeholder="输入位置信息..." style="
                      width: 100%;
                      background-color: #000;
                      border: 1px solid #333;
                      border-radius: 8px;
                      color: #fff;
                      padding: 12px;
                      font-size: 15px;
                      outline: none;
                      box-sizing: border-box;
                    " onfocus="this.style.borderColor='#1d9bf0'" onblur="this.style.borderColor='#333'">
                    <div style="display: flex; gap: 8px; margin-top: 12px;">
                      <button onclick="saveLocationData()" style="
                        flex: 1;
                        background-color: #1d9bf0;
                        color: #fff;
                        border: none;
                        border-radius: 8px;
                        padding: 8px;
                        font-size: 13px;
                        cursor: pointer;
                        transition: all 0.2s;
                      " onmouseover="this.style.backgroundColor='#1a8cd8'"
                        onmouseout="this.style.backgroundColor='#1d9bf0'">
                        保存位置
                      </button>
                      <button onclick="removeLocation()" style="
                        flex: 1;
                        background-color: transparent;
                        color: #f4212e;
                        border: 1px solid #f4212e;
                        border-radius: 8px;
                        padding: 8px;
                        font-size: 13px;
                        cursor: pointer;
                        transition: all 0.2s;
                      " onmouseover="this.style.backgroundColor='rgba(244,33,46,0.1)'"
                        onmouseout="this.style.backgroundColor='transparent'">
                        移除位置
                      </button>
                    </div>
                  </div>
                </div>

                <!-- 附带链接区域 -->
                <div id="compose-link-section" style="display: none; margin-bottom: 16px;">
                  <div style="background-color: #1a1a1a; border: 1px solid #333; border-radius: 12px; padding: 16px;">
                    <div style="color: #fff; font-size: 15px; font-weight: 600; margin-bottom: 12px;">附带链接</div>

                    <!-- 链接标题 -->
                    <input type="text" id="link-title-input" placeholder="链接标题..." style="
                      width: 100%;
                      background-color: #000;
                      border: 1px solid #333;
                      border-radius: 8px;
                      color: #fff;
                      padding: 12px;
                      font-size: 15px;
                      outline: none;
                      box-sizing: border-box;
                      margin-bottom: 12px;
                    " onfocus="this.style.borderColor='#1d9bf0'" onblur="this.style.borderColor='#333'">

                    <!-- 链接地址 -->
                    <input type="text" id="link-url-input" placeholder="example.com" style="
                      width: 100%;
                      background-color: #000;
                      border: 1px solid #333;
                      border-radius: 8px;
                      color: #fff;
                      padding: 12px;
                      font-size: 15px;
                      outline: none;
                      box-sizing: border-box;
                      margin-bottom: 12px;
                    " onfocus="this.style.borderColor='#1d9bf0'" onblur="this.style.borderColor='#333'">

                    <!-- 链接描述 -->
                    <textarea id="link-description-input" placeholder="简述链接内容..." style="
                      width: 100%;
                      min-height: 60px;
                      background-color: #000;
                      border: 1px solid #333;
                      border-radius: 8px;
                      color: #fff;
                      padding: 12px;
                      font-size: 15px;
                      resize: vertical;
                      outline: none;
                      font-family: inherit;
                      box-sizing: border-box;
                      margin-bottom: 12px;
                    " onfocus="this.style.borderColor='#1d9bf0'" onblur="this.style.borderColor='#333'"></textarea>

                    <!-- 链接首图上传 -->
                    <div style="margin-bottom: 12px;">
                      <label
                        style="display: block; color: #8b98a5; font-size: 13px; margin-bottom: 8px;">链接首图（可选）</label>
                      <div style="
                        border: 2px dashed #333;
                        border-radius: 8px;
                        padding: 16px;
                        text-align: center;
                        cursor: pointer;
                        transition: all 0.2s;
                      " onclick="triggerLinkImageUpload()" onmouseover="this.style.borderColor='#1d9bf0'"
                        onmouseout="this.style.borderColor='#333'">
                        <svg viewBox="0 0 24 24" style="width: 24px; height: 24px; fill: #71767b; margin-bottom: 4px;">
                          <g>
                            <path
                              d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z">
                            </path>
                          </g>
                        </svg>
                        <div style="color: #71767b; font-size: 13px;">点击上传链接首图</div>
                      </div>
                      <input type="file" id="link-image-input" accept="image/*" style="display: none;"
                        onchange="handleLinkImageUpload(event)">
                      <div id="link-image-preview" style="display: none; margin-top: 8px;">
                        <img id="link-preview-image"
                          style="width: 100%; max-height: 120px; object-fit: cover; border-radius: 8px;" alt="链接首图预览">
                      </div>
                    </div>

                    <div style="display: flex; gap: 8px;">
                      <button onclick="saveLinkData()" style="
                        flex: 1;
                        background-color: #1d9bf0;
                        color: #fff;
                        border: none;
                        border-radius: 8px;
                        padding: 8px;
                        font-size: 13px;
                        cursor: pointer;
                        transition: all 0.2s;
                      " onmouseover="this.style.backgroundColor='#1a8cd8'"
                        onmouseout="this.style.backgroundColor='#1d9bf0'">
                        保存链接
                      </button>
                      <button onclick="removeLink()" style="
                        flex: 1;
                        background-color: transparent;
                        color: #f4212e;
                        border: 1px solid #f4212e;
                        border-radius: 8px;
                        padding: 8px;
                        font-size: 13px;
                        cursor: pointer;
                        transition: all 0.2s;
                      " onmouseover="this.style.backgroundColor='rgba(244,33,46,0.1)'"
                        onmouseout="this.style.backgroundColor='transparent'">
                        移除链接
                      </button>
                    </div>
                  </div>
                </div>

                <!-- 功能按钮栏 -->
                <div
                  style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid #2f3336; padding-top: 16px;">
                  <!-- 左侧功能按钮 -->
                  <div style="display: flex; gap: 16px;">
                    <!-- 图片按钮 -->
                    <div id="image-btn" onclick="toggleImageSection()" style="
                      padding: 8px;
                      border-radius: 50%;
                      cursor: pointer;
                      transition: background-color 0.2s;
                    " onmouseover="this.style.backgroundColor='rgba(29,155,240,0.1)'"
                      onmouseout="this.style.backgroundColor='transparent'">
                      <svg viewBox="0 0 24 24" style="width: 20px; height: 20px; fill: #1d9bf0;">
                        <g>
                          <path
                            d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z">
                          </path>
                        </g>
                      </svg>
                    </div>

                    <!-- 定位按钮 -->
                    <div id="location-btn" onclick="toggleLocationSection()" style="
                      padding: 8px;
                      border-radius: 50%;
                      cursor: pointer;
                      transition: background-color 0.2s;
                    " onmouseover="this.style.backgroundColor='rgba(29,155,240,0.1)'"
                      onmouseout="this.style.backgroundColor='transparent'">
                      <svg viewBox="0 0 24 24" style="width: 20px; height: 20px; fill: #1d9bf0;">
                        <g>
                          <path
                            d="M12 7c-1.93 0-3.5 1.57-3.5 3.5S10.07 14 12 14s3.5-1.57 3.5-3.5S13.93 7 12 7zm0 5c-.827 0-1.5-.673-1.5-1.5S11.173 9 12 9s1.5.673 1.5 1.5S12.827 12 12 12zm0-10c-4.687 0-8.5 3.813-8.5 8.5 0 5.967 7.621 11.116 7.945 11.332l.555.37.555-.37C12.879 21.616 20.5 16.467 20.5 10.5 20.5 5.813 16.687 2 12 2zm0 17.77c-1.665-1.241-6.5-5.196-6.5-9.27C5.5 6.916 8.416 4 12 4s6.5 2.916 6.5 6.5c0 4.073-4.835 8.028-6.5 9.27z">
                          </path>
                        </g>
                      </svg>
                    </div>

                    <!-- 附带按钮 -->
                    <div id="attach-btn" onclick="toggleLinkSection()" style="
                      padding: 8px;
                      border-radius: 50%;
                      cursor: pointer;
                      transition: background-color 0.2s;
                    " onmouseover="this.style.backgroundColor='rgba(29,155,240,0.1)'"
                      onmouseout="this.style.backgroundColor='transparent'">
                      <svg viewBox="0 0 24 24" style="width: 20px; height: 20px; fill: #1d9bf0;">
                        <g>
                          <path
                            d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z">
                          </path>
                        </g>
                      </svg>
                    </div>
                  </div>

                  <!-- 右侧隐私设置 -->
                  <div id="privacy-setting-btn" onclick="togglePrivacySettings()" style="
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 8px 12px;
                    border-radius: 20px;
                    cursor: pointer;
                    border: 1px solid #536471;
                    transition: background-color 0.2s;
                  " onmouseover="this.style.backgroundColor='rgba(255,255,255,0.03)'"
                    onmouseout="this.style.backgroundColor='transparent'">
                    <svg id="privacy-icon" viewBox="0 0 24 24" style="width: 16px; height: 16px; fill: #1d9bf0;">
                      <g>
                        <path id="privacy-icon-path"
                          d="M12 1.75C6.34 1.75 1.75 6.34 1.75 12S6.34 22.25 12 22.25 22.25 17.66 22.25 12 17.66 1.75 12 1.75zm-.81 14.68l-4.1-3.27 1.25-1.57 2.47 1.98 3.97-5.47 1.62 1.18-5.21 7.15z">
                        </path>
                      </g>
                    </svg>
                    <span id="privacy-text" style="color: #1d9bf0; font-size: 13px; font-weight: 600;">所有人可以回复</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- NPC编辑弹窗 -->
    <div id="npc-edit-modal" style="
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(91, 112, 131, 0.4);
      z-index: 20;
      overflow-y: auto;
    " onclick="closeNPCEditModal(event)">
      <div style="
        background-color: #000;
        margin: 40px auto;
        border-radius: 16px;
        max-width: 600px;
        width: calc(100% - 40px);
        max-height: calc(100vh - 80px);
        position: relative;
        overflow: hidden;
      " onclick="event.stopPropagation()">
        <!-- 弹窗头部 -->
        <div style="
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px;
          border-bottom: 1px solid #2f3336;
        ">
          <div style="display: flex; align-items: center; gap: 24px;">
            <div onclick="closeNPCEditModal()" style="
              cursor: pointer;
              padding: 8px;
              border-radius: 50%;
              transition: background-color 0.2s;
            " onmouseover="this.style.backgroundColor='rgba(239,243,244,0.1)'"
              onmouseout="this.style.backgroundColor='transparent'">
              <svg viewBox="0 0 24 24" style="width: 20px; height: 20px; fill: #fff;">
                <g><path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path></g>
              </svg>
            </div>
            <h2 style="color: #fff; font-size: 20px; font-weight: 700; margin: 0;" id="npc-modal-title">编辑NPC</h2>
          </div>
        </div>

        <!-- 弹窗内容 -->
        <div style="padding: 20px; overflow-y: auto; max-height: calc(100vh - 200px);">
          <!-- NPC姓名 -->
          <div style="margin-bottom: 20px;">
            <label style="display: block; color: #8b98a5; font-size: 13px; margin-bottom: 8px;">NPC姓名</label>
            <input type="text" id="npc-name" placeholder="输入NPC姓名" style="
              width: 100%;
              background-color: #1a1a1a;
              border: 1px solid #333;
              border-radius: 8px;
              color: #fff;
              padding: 12px;
              font-size: 15px;
              outline: none;
              box-sizing: border-box;
            " onfocus="this.style.borderColor='#1d9bf0'" onblur="this.style.borderColor='#333'" maxlength="50">
          </div>

          <!-- NPC句柄 -->
          <div style="margin-bottom: 20px;">
            <label style="display: block; color: #8b98a5; font-size: 13px; margin-bottom: 8px;">NPC句柄</label>
            <input type="text" id="npc-handle" placeholder="@句柄" style="
              width: 100%;
              background-color: #1a1a1a;
              border: 1px solid #333;
              border-radius: 8px;
              color: #fff;
              padding: 12px;
              font-size: 15px;
              outline: none;
              box-sizing: border-box;
            " onfocus="this.style.borderColor='#1d9bf0'" onblur="this.style.borderColor='#333'" maxlength="30">
          </div>

          <!-- NPC头像 -->
          <div style="margin-bottom: 20px;">
            <label style="display: block; color: #8b98a5; font-size: 13px; margin-bottom: 8px;">NPC头像URL</label>
            <input type="text" id="npc-avatar" placeholder="输入头像URL" style="
              width: 100%;
              background-color: #1a1a1a;
              border: 1px solid #333;
              border-radius: 8px;
              color: #fff;
              padding: 12px;
              font-size: 15px;
              outline: none;
              box-sizing: border-box;
            " onfocus="this.style.borderColor='#1d9bf0'" onblur="this.style.borderColor='#333'">
          </div>

          <!-- NPC人设 -->
          <div style="margin-bottom: 20px;">
            <label style="display: block; color: #8b98a5; font-size: 13px; margin-bottom: 8px;">NPC人设</label>
            <textarea id="npc-personality" placeholder="描述NPC的性格、背景、行为特征..." style="
              width: 100%;
              min-height: 120px;
              background-color: #1a1a1a;
              border: 1px solid #333;
              border-radius: 8px;
              color: #fff;
              padding: 12px;
              font-size: 15px;
              resize: vertical;
              outline: none;
              box-sizing: border-box;
            " onfocus="this.style.borderColor='#1d9bf0'" onblur="this.style.borderColor='#333'"></textarea>
          </div>

          <!-- 发帖习惯 -->
          <div style="margin-bottom: 20px;">
            <label style="display: block; color: #8b98a5; font-size: 13px; margin-bottom: 8px;">发帖习惯</label>
            <textarea id="npc-posting-habits" placeholder="描述NPC的发帖风格、频率、内容偏好..." style="
              width: 100%;
              min-height: 100px;
              background-color: #1a1a1a;
              border: 1px solid #333;
              border-radius: 8px;
              color: #fff;
              padding: 12px;
              font-size: 15px;
              resize: vertical;
              outline: none;
              box-sizing: border-box;
            " onfocus="this.style.borderColor='#1d9bf0'" onblur="this.style.borderColor='#333'"></textarea>
          </div>

          <!-- 主页内容 -->
          <div style="margin-bottom: 20px;">
            <label style="display: block; color: #8b98a5; font-size: 13px; margin-bottom: 8px;">主页内容设置</label>
            <textarea id="npc-homepage" placeholder="描述NPC主页的展示内容、简介等..." style="
              width: 100%;
              min-height: 80px;
              background-color: #1a1a1a;
              border: 1px solid #333;
              border-radius: 8px;
              color: #fff;
              padding: 12px;
              font-size: 15px;
              resize: vertical;
              outline: none;
              box-sizing: border-box;
            " onfocus="this.style.borderColor='#1d9bf0'" onblur="this.style.borderColor='#333'"></textarea>
          </div>

          <!-- 绑定用户 -->
          <div style="margin-bottom: 20px;">
            <label style="display: block; color: #8b98a5; font-size: 13px; margin-bottom: 8px;">绑定用户（可多选）</label>
            <div id="npc-bind-users" style="
              background-color: #1a1a1a;
              border: 1px solid #333;
              border-radius: 8px;
              padding: 12px;
              max-height: 200px;
              overflow-y: auto;
            ">
              <!-- 用户列表将动态生成 -->
            </div>
          </div>

          <!-- 保存按钮 -->
          <button onclick="saveNPC()" style="
            width: 100%;
            background-color: #1d9bf0;
            color: #fff;
            border: none;
            border-radius: 25px;
            padding: 14px;
            font-size: 16px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s;
          " onmouseover="this.style.backgroundColor='#1a8cd8'" onmouseout="this.style.backgroundColor='#1d9bf0'">
            保存NPC
          </button>
        </div>
      </div>
    </div>

    <!-- 提问箱页面 -->
    <div id="x-askbox-page" class="x-page" style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; display: none; flex-direction: column; overflow: hidden; z-index: 15;">
      <!-- 背景图 -->
      <div id="askbox-background" style="
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: url('https://i.postimg.cc/7LqVqxt4/mmexport1759588659314.jpg');
        background-size: cover;
        background-position: center;
        z-index: 0;
      "></div>

      <!-- 主内容区域 -->
      <div style="position: relative; z-index: 1; width: 100%; height: 100%; display: flex; flex-direction: column; overflow-y: auto; padding-top: 20px;">
        <!-- 顶部按钮栏 -->
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 20px 16px 12px 16px;">
          <!-- 返回按钮 -->
          <div onclick="switchXPage('profile')" style="cursor: pointer; padding: 8px; border-radius: 50%; background-color: rgba(255,255,255,0.2); backdrop-filter: blur(10px); transition: all 0.2s;"
            onmouseover="this.style.backgroundColor='rgba(255,255,255,0.3)'"
            onmouseout="this.style.backgroundColor='rgba(255,255,255,0.2)'">
            <svg viewBox="0 0 24 24" style="width: 20px; height: 20px; fill: #fff;">
              <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"/>
            </svg>
          </div>

          <!-- 设置按钮 -->
          <div onclick="openAskboxSettings()" style="cursor: pointer; padding: 8px; border-radius: 50%; background-color: rgba(255,255,255,0.2); backdrop-filter: blur(10px); transition: all 0.2s;"
            onmouseover="this.style.backgroundColor='rgba(255,255,255,0.3)'"
            onmouseout="this.style.backgroundColor='rgba(255,255,255,0.2)'">
            <svg viewBox="0 0 24 24" style="width: 20px; height: 20px; fill: #fff;">
              <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
            </svg>
          </div>
        </div>

        <!-- 头像和昵称区域 -->
        <div style="display: flex; flex-direction: column; align-items: center; padding: 20px 16px;">
          <!-- 头像 -->
          <div onclick="changeAskboxAvatar()" style="cursor: pointer; margin-bottom: 12px; position: relative; transition: transform 0.2s;"
            onmouseover="this.style.transform='scale(1.05)'"
            onmouseout="this.style.transform='scale(1)'">
            <img id="askbox-avatar" src="https://i.postimg.cc/4xmx7V4R/mmexport1759081128356.jpg" 
              style="width: 80px; height: 80px; border-radius: 50%; border: 3px solid rgba(255,255,255,0.8); box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
          </div>

          <!-- 昵称/ID区域 -->
          <div style="display: flex; align-items: center; gap: 8px; background-color: rgba(255,255,255,0.15); backdrop-filter: blur(10px); padding: 6px 12px; border-radius: 20px;">
            <span id="askbox-nickname" 
              contenteditable="true"
              style="color: #fff; font-size: 14px; font-weight: 500; outline: none; cursor: text; min-width: 20px;"
              onblur="saveAskboxNickname()"
              onkeydown="if(event.key==='Enter'){event.preventDefault();this.blur();}">= =</span>
          </div>
        </div>

        <!-- 提问卡片 -->
        <div style="
          margin: 0 20px 24px 20px;
          background-color: rgba(255,255,255,0.9);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          padding: 32px 24px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.1);
          transition: all 0.2s;
          min-height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <div id="askbox-prompt" 
            contenteditable="true"
            style="
            color: #333;
            font-size: 16px;
            line-height: 1.6;
            text-align: center;
            word-break: break-word;
            outline: none;
            cursor: text;
            width: 100%;
          "
          onblur="saveAskboxPrompt()"
          onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();this.blur();}">请向我匿名提问!waiting...</div>
        </div>

        <!-- 获取新提问按钮 -->
        <div onclick="getNewQuestion()" style="
          margin: 0 20px 32px 20px;
          background-color: rgba(255,255,255,0.85);
          backdrop-filter: blur(10px);
          border-radius: 24px;
          padding: 14px 24px;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        " onmouseover="this.style.backgroundColor='rgba(255,255,255,0.95)'; this.style.transform='translateY(-1px)'"
          onmouseout="this.style.backgroundColor='rgba(255,255,255,0.85)'; this.style.transform='translateY(0)'">
          <span style="color: #333; font-size: 15px; font-weight: 600;">获取新的提问</span>
        </div>

        <!-- 已回答的提问列表 -->
        <div style="padding: 0 20px 20px 20px;">
          <div id="answered-questions-title" style="
            color: rgba(255,255,255,0.8);
            font-size: 15px;
            font-weight: 500;
            margin-bottom: 16px;
            text-align: center;
            display: none;
          ">最新提问如下</div>
          <div id="answered-questions-list">
            <!-- 已回答的提问将动态加载在这里 -->
          </div>
        </div>
      </div>
    </div>

    <!-- 账户主页 -->
    <div id="account-profile-page" class="x-page" style="display: none; flex-direction: column; height: 100%; overflow: hidden;">
      <!-- 顶部导航栏（简化版，只显示账户名和推文数） -->
      <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 15px; border-bottom: 1px solid #2f3336; background-color: rgba(0,0,0,0.8); backdrop-filter: blur(12px); position: sticky; top: 0; z-index: 10;">
        <div style="display: flex; align-items: center;">
          <div onclick="closeAccountProfile()" style="cursor: pointer; padding: 8px; margin-right: 30px; border-radius: 50%; transition: background-color 0.2s;" onmouseover="this.style.backgroundColor='rgba(239,243,244,0.1)'" onmouseout="this.style.backgroundColor='transparent'">
            <svg viewBox="0 0 24 24" style="width: 20px; height: 20px; fill: #fff;">
              <g><path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"></path></g>
            </svg>
          </div>
          <div>
            <div id="account-profile-nav-name" style="color: #fff; font-size: 20px; font-weight: 700; line-height: 1.2;"></div>
            <div id="account-profile-nav-count" style="color: #71767b; font-size: 13px; margin-top: 2px;">0 个帖子</div>
          </div>
        </div>
        
        <!-- 右侧按钮组 -->
        <div style="display: flex; align-items: center; gap: 8px;">
          <!-- 提问箱按钮 -->
          <div onclick="openAccountAskbox()" style="cursor: pointer; padding: 8px; border-radius: 50%; transition: background-color 0.2s;" onmouseover="this.style.backgroundColor='rgba(239,243,244,0.1)'" onmouseout="this.style.backgroundColor='transparent'" title="提问箱">
            <svg viewBox="0 0 24 24" style="width: 20px; height: 20px; fill: #fff;">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
          </div>
          
          <!-- 刷新按钮 -->
          <div onclick="refreshAccountProfile()" style="cursor: pointer; padding: 8px; border-radius: 50%; transition: background-color 0.2s;" onmouseover="this.style.backgroundColor='rgba(239,243,244,0.1)'" onmouseout="this.style.backgroundColor='transparent'" title="刷新账户主页">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 4.55a8 8 0 0 1 6 14.9m0 -4.45v5h5" />
              <path d="M5.63 7.16l0 .01" />
              <path d="M4.06 11l0 .01" />
              <path d="M4.63 15.1l0 .01" />
              <path d="M7.16 18.37l0 .01" />
              <path d="M11 19.94l0 .01" />
            </svg>
          </div>
        </div>
      </div>

      <!-- 主内容区域 -->
      <div style="flex: 1; overflow-y: auto;">
        <!-- 背景图 -->
        <div id="account-cover-image" style="width: 100%; height: 140px; background-color: #333; background-size: cover; background-position: center; position: relative;"></div>

        <!-- 账户信息 -->
        <div style="padding: 8px 16px 0 16px;">
          <!-- 头像和操作按钮行 -->
          <div style="display: flex; justify-content: space-between; align-items: flex-start; position: relative; margin-bottom: 12px;">
            <!-- 头像 -->
            <img id="account-avatar-image" src="" alt="账户头像" style="width: 68px; height: 68px; border-radius: 50%; border: 4px solid #000; background-color: #000; position: absolute; top: -34px; left: 0;">
            
            <!-- 右侧按钮组 -->
            <div style="display: flex; gap: 8px; margin-left: auto; margin-top: 8px;">
              <!-- 私信按钮 -->
              <button onclick="sendMessageToAccount()" style="
                width: 36px;
                height: 36px;
                border-radius: 50%;
                border: 1px solid #536471;
                background: transparent;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: background-color 0.2s;
              " onmouseover="this.style.backgroundColor='rgba(239,243,244,0.1)'" onmouseout="this.style.backgroundColor='transparent'">
                <svg viewBox="0 0 24 24" style="width: 18px; height: 18px; fill: #fff;">
                  <g><path d="M1.998 5.5c0-1.381 1.119-2.5 2.5-2.5h15c1.381 0 2.5 1.119 2.5 2.5v13c0 1.381-1.119 2.5-2.5 2.5h-15c-1.381 0-2.5-1.119-2.5-2.5v-13zm2.5-.5c-.276 0-.5.224-.5.5v2.764l8 3.638 8-3.636V5.5c0-.276-.224-.5-.5-.5h-15zm15.5 5.463l-8 3.636-8-3.638V18.5c0 .276.224.5.5.5h15c.276 0 .5-.224.5-.5v-8.037z"></path></g>
                </svg>
              </button>

              <!-- 通知按钮（关注后显示） -->
              <button id="account-notify-btn" onclick="toggleAccountNotifications()" style="
                width: 36px;
                height: 36px;
                border-radius: 50%;
                border: 1px solid #536471;
                background: transparent;
                display: none;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: background-color 0.2s;
              " onmouseover="this.style.backgroundColor='rgba(239,243,244,0.1)'" onmouseout="this.style.backgroundColor='transparent'">
                <svg viewBox="0 0 24 24" style="width: 18px; height: 18px; fill: #fff;">
                  <g><path d="M19.993 9.042C19.48 5.017 16.054 2 11.996 2s-7.49 3.021-7.999 7.051L2.866 18H7.1c.463 2.282 2.481 4 4.9 4s4.437-1.718 4.9-4h4.236l-1.143-8.958zM12 20c-1.306 0-2.417-.835-2.829-2h5.658c-.412 1.165-1.523 2-2.829 2zm-6.866-4l.847-6.698C6.364 6.272 8.941 4 11.996 4s5.627 2.268 6.013 5.295L18.864 16H5.134z"></path></g>
                </svg>
              </button>

              <!-- 关注按钮 -->
              <button id="account-follow-btn" onclick="toggleAccountFollow()" style="
                min-width: 110px;
                height: 36px;
                border-radius: 18px;
                border: none;
                background: #fff;
                color: #000;
                font-size: 15px;
                font-weight: 700;
                cursor: pointer;
                transition: all 0.2s;
                padding: 0 16px;
              " onmouseover="if(this.textContent==='关注'){this.style.backgroundColor='#e6e6e6';}" onmouseout="if(this.textContent==='关注'){this.style.backgroundColor='#fff';}">
                关注
              </button>
            </div>
          </div>

          <!-- 账户名称和认证 -->
          <div style="margin-bottom: 2px; margin-top: 30px; padding-left: 8px;">
            <div style="display: flex; align-items: center; gap: 4px;">
              <span id="account-display-name" style="color: #fff; font-size: 20px; font-weight: 800; line-height: 1.2;"></span>
              <div id="account-verified-badge" style="display: none;"></div>
            </div>
          </div>

          <!-- 账户句柄 -->
          <div style="margin-bottom: 12px; padding-left: 8px;">
            <span id="account-handle-text" style="color: #71767b; font-size: 15px;"></span>
          </div>

          <!-- 简介 -->
          <div id="account-bio-text" style="color: #fff; font-size: 15px; line-height: 20px; margin-bottom: 12px; padding-left: 8px; display: none;"></div>

          <!-- 自定义标签 -->
          <div id="account-tags-container" style="display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 12px; padding-left: 8px;"></div>

          <!-- 关注数据 -->
          <div style="display: flex; gap: 20px; margin-bottom: 16px; padding-left: 8px;">
            <div style="cursor: pointer;" onmouseover="this.querySelector('span').style.textDecoration='underline'" onmouseout="this.querySelector('span').style.textDecoration='none'">
              <span id="account-following-count" style="color: #fff; font-weight: 700; font-size: 14px;">0</span>
              <span style="color: #71767b; margin-left: 4px; font-size: 14px;">正在关注</span>
            </div>
            <div style="cursor: pointer;" onmouseover="this.querySelector('span').style.textDecoration='underline'" onmouseout="this.querySelector('span').style.textDecoration='none'">
              <span id="account-followers-count" style="color: #fff; font-weight: 700; font-size: 14px;">0</span>
              <span style="color: #71767b; margin-left: 4px; font-size: 14px;">关注者</span>
            </div>
          </div>

          <!-- 关注提示 -->
          <div id="account-follows-you" style="display: none; color: #71767b; font-size: 13px; margin-bottom: 16px; padding-left: 8px;">
            关注你
          </div>
        </div>

        <!-- 标签栏 -->
        <div style="display: flex; border-bottom: 1px solid #2f3336;">
          <div class="account-tab active" onclick="switchAccountTab('posts')" style="flex: 1; text-align: center; padding: 16px 0; font-size: 15px; font-weight: 700; color: #fff; cursor: pointer; position: relative; border-bottom: 4px solid #1d9bf0;">
            帖子
          </div>
          <div class="account-tab" onclick="switchAccountTab('replies')" style="flex: 1; text-align: center; padding: 16px 0; font-size: 15px; font-weight: 500; color: #71767b; cursor: pointer; position: relative; border-bottom: 4px solid transparent;">
            回复
          </div>
          <div class="account-tab" onclick="switchAccountTab('highlights')" style="flex: 1; text-align: center; padding: 16px 0; font-size: 15px; font-weight: 500; color: #71767b; cursor: pointer; position: relative; border-bottom: 4px solid transparent;">
            亮点
          </div>
          <div class="account-tab" onclick="switchAccountTab('media')" style="flex: 1; text-align: center; padding: 16px 0; font-size: 15px; font-weight: 500; color: #71767b; cursor: pointer; position: relative; border-bottom: 4px solid transparent;">
            媒体
          </div>
        </div>

        <!-- 推文列表 -->
        <div id="account-tweets-container">
          <!-- 推文将动态插入这里 -->
        </div>
      </div>
    </div>

    <!-- 账户提问箱页面 -->
    <div id="account-askbox-page" class="x-page" style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; display: none; flex-direction: column; overflow: hidden; z-index: 15;">
      <!-- 背景图 -->
      <div id="account-askbox-background" style="
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: url('https://i.postimg.cc/tJvBC00j/mmexport1759642131681.jpg');
        background-size: cover;
        background-position: center;
        z-index: 0;
      "></div>

      <!-- 主内容区域 -->
      <div style="position: relative; z-index: 1; width: 100%; height: 100%; display: flex; flex-direction: column; overflow-y: auto; padding-top: 20px;">
        <!-- 顶部按钮栏 -->
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 20px 16px 12px 16px;">
          <!-- 返回按钮 -->
          <div onclick="closeAccountAskbox()" style="cursor: pointer; padding: 8px; border-radius: 50%; background-color: rgba(255,255,255,0.2); backdrop-filter: blur(10px); transition: all 0.2s;"
            onmouseover="this.style.backgroundColor='rgba(255,255,255,0.3)'"
            onmouseout="this.style.backgroundColor='rgba(255,255,255,0.2)'">
            <svg viewBox="0 0 24 24" style="width: 20px; height: 20px; fill: #fff;">
              <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"/>
            </svg>
          </div>

          <!-- 设置按钮 -->
          <div onclick="openAccountAskboxSettings()" style="cursor: pointer; padding: 8px; border-radius: 50%; background-color: rgba(255,255,255,0.2); backdrop-filter: blur(10px); transition: all 0.2s;"
            onmouseover="this.style.backgroundColor='rgba(255,255,255,0.3)'"
            onmouseout="this.style.backgroundColor='rgba(255,255,255,0.2)'">
            <svg viewBox="0 0 24 24" style="width: 20px; height: 20px; fill: #fff;">
              <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
            </svg>
          </div>
        </div>

        <!-- 头像和昵称区域 -->
        <div style="display: flex; flex-direction: column; align-items: center; padding: 20px 16px;">
          <!-- 头像 -->
          <div onclick="changeAccountAskboxAvatar()" style="cursor: pointer; margin-bottom: 12px; position: relative; transition: transform 0.2s;"
            onmouseover="this.style.transform='scale(1.05)'"
            onmouseout="this.style.transform='scale(1)'">
            <img id="account-askbox-avatar" src="https://i.postimg.cc/4xmx7V4R/mmexport1759081128356.jpg" 
              style="width: 80px; height: 80px; border-radius: 50%; border: 3px solid rgba(255,255,255,0.8); box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
          </div>

          <!-- 昵称/ID区域 -->
          <div style="display: flex; align-items: center; gap: 8px; background-color: rgba(255,255,255,0.15); backdrop-filter: blur(10px); padding: 6px 12px; border-radius: 20px;">
            <span id="account-askbox-nickname" 
              contenteditable="true"
              style="color: #fff; font-size: 14px; font-weight: 500; outline: none; cursor: text; min-width: 20px;"
              onblur="saveAccountAskboxNickname()"
              onkeydown="if(event.key==='Enter'){event.preventDefault();this.blur();}">⩌⌯⩌</span>
          </div>
        </div>

        <!-- 提问卡片 -->
        <div style="
          margin: 0 20px 24px 20px;
          background-color: rgba(255,255,255,0.9);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          padding: 32px 24px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.1);
          transition: all 0.2s;
          min-height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <div id="account-askbox-prompt" 
            contenteditable="true"
            style="
            color: #333;
            font-size: 16px;
            line-height: 1.6;
            text-align: center;
            word-break: break-word;
            outline: none;
            cursor: text;
            width: 100%;
          "
          onblur="saveAccountAskboxPrompt()"
          onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();this.blur();}">请向我匿名提问!waiting...</div>
        </div>

        <!-- 获取新提问按钮 -->
        <div onclick="getNewAccountQuestion()" style="
          margin: 0 20px 32px 20px;
          background-color: rgba(255,255,255,0.85);
          backdrop-filter: blur(10px);
          border-radius: 24px;
          padding: 14px 24px;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        " onmouseover="this.style.backgroundColor='rgba(255,255,255,0.95)'; this.style.transform='translateY(-1px)'"
          onmouseout="this.style.backgroundColor='rgba(255,255,255,0.85)'; this.style.transform='translateY(0)'">
          <span style="color: #333; font-size: 15px; font-weight: 600;">获取新的提问</span>
        </div>

        <!-- 已回答的提问列表 -->
        <div style="padding: 0 20px 20px 20px;">
          <div id="account-answered-questions-title" style="
            color: rgba(255,255,255,0.8);
            font-size: 15px;
            font-weight: 500;
            margin-bottom: 16px;
            text-align: center;
            display: none;
          ">最新提问如下</div>
          <div id="account-answered-questions-list">
            <!-- 已回答的提问将动态加载在这里 -->
          </div>
        </div>
      </div>
    </div>
  </div>

    <!-- 底部导航栏 -->
    <div class="x-bottom-nav"
      style="display: flex; justify-content: space-around; padding: 10px 0; border-top: 1px solid #333; background-color: #000;">
      <!-- 主页图标 -->
      <div class="x-nav-item active" onclick="switchXPage('home')"
        style="display: flex; justify-content: center; align-items: center; position: relative; padding: 5px 15px; cursor: pointer;">
        <svg viewBox="0 0 24 24" aria-hidden="true" style="width: 26px; height: 26px; fill: #1d9bf0;">
          <g>
            <path
              d="M12 1.696L.622 8.807l1.06 1.696L3 9.679V19.5C3 20.881 4.119 22 5.5 22h13c1.381 0 2.5-1.119 2.5-2.5V9.679l1.318.824 1.06-1.696L12 1.696zM12 16.5c-1.933 0-3.5-1.567-3.5-3.5s1.567-3.5 3.5-3.5 3.5 1.567 3.5 3.5-1.567 3.5-3.5 3.5z">
            </path>
          </g>
        </svg>
        <!-- 高亮效果 -->
        <div class="nav-highlight"
          style="position: absolute; width: 5px; height: 5px; background-color: #1d9bf0; border-radius: 50%; bottom: -8px;">
        </div>
      </div>

      <!-- 搜索图标 -->
      <div class="x-nav-item" onclick="switchXPage('search')"
        style="display: flex; justify-content: center; align-items: center; position: relative; padding: 5px 15px; cursor: pointer;">
        <svg viewBox="0 0 24 24" aria-hidden="true" style="width: 26px; height: 26px; fill: #fff;">
          <g>
            <path
              d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z">
            </path>
          </g>
        </svg>
        <div class="nav-highlight"
          style="position: absolute; width: 5px; height: 5px; background-color: #1d9bf0; border-radius: 50%; bottom: -8px; display: none;">
        </div>
      </div>

      <!-- 通知图标 -->
      <div class="x-nav-item" onclick="switchXPage('notifications')"
        style="display: flex; justify-content: center; align-items: center; position: relative; padding: 5px 15px; cursor: pointer;">
        <svg viewBox="0 0 24 24" aria-hidden="true" style="width: 26px; height: 26px; fill: #fff;">
          <g>
            <path
              d="M19.993 9.042C19.48 5.017 16.054 2 11.996 2s-7.49 3.021-7.999 7.051L2.866 18H7.1c.463 2.282 2.481 4 4.9 4s4.437-1.718 4.9-4h4.236l-1.143-8.958zM12 20c-1.306 0-2.417-.835-2.829-2h5.658c-.412 1.165-1.523 2-2.829 2zm-6.866-4l.847-6.698C6.364 6.272 8.941 4 11.996 4s5.627 2.268 6.013 5.295L18.864 16H5.134z">
            </path>
          </g>
        </svg>
        <div class="nav-highlight"
          style="position: absolute; width: 5px; height: 5px; background-color: #1d9bf0; border-radius: 50%; bottom: -8px; display: none;">
        </div>
      </div>

      <!-- 私信图标 -->
      <div class="x-nav-item" onclick="switchXPage('messages')"
        style="display: flex; justify-content: center; align-items: center; position: relative; padding: 5px 15px; cursor: pointer;">
        <svg viewBox="0 0 24 24" aria-hidden="true" style="width: 26px; height: 26px; fill: #fff;">
          <g>
            <path
              d="M1.998 5.5c0-1.381 1.119-2.5 2.5-2.5h15c1.381 0 2.5 1.119 2.5 2.5v13c0 1.381-1.119 2.5-2.5 2.5h-15c-1.381 0-2.5-1.119-2.5-2.5v-13zm2.5-.5c-.276 0-.5.224-.5.5v2.764l8 3.638 8-3.636V5.5c0-.276-.224-.5-.5-.5h-15zm15.5 5.463l-8 3.636-8-3.638V18.5c0 .276.224.5.5.5h15c.276 0 .5-.224.5-.5v-8.037z">
            </path>
          </g>
        </svg>
        <div class="nav-highlight"
          style="position: absolute; width: 5px; height: 5px; background-color: #1d9bf0; border-radius: 50%; bottom: -8px; display: none;">
        </div>
      </div>
    </div>
  <!-- ▲▲▲ X社交页面结束 ▲▲▲ -->
    `;

    // 将创建的HTML添加到body
    document.body.appendChild(container);
    console.log('✅ X Social App: HTML结构已创建');
  }

  // ============================================
  // 第三部分: 核心JavaScript功能
  // ============================================

  // === 工具函数集合 (从31766行开始) ===

  // X社交专用数据库配置函数
  function getXDB() {
    const db = new Dexie('XSocialDB');
    // 版本1：初始表结构
    db.version(1).stores({
      xTweetsData: '&id',
      xSettings: '&id',
      xPresets: '++id, name, createdAt',
      xUserProfile: '&id',
      xUserTweets: '&id',
      xCharacterProfiles: '&characterId',
      xActiveAccount: '&id',
      xAccountList: '&accountId, name, createdAt',
      xNPCs: '&id',
      xAskbox: '&id',
    });
    // 版本2：添加账户主页和账户提问箱表
    db.version(2).stores({
      xTweetsData: '&id',
      xSettings: '&id',
      xPresets: '++id, name, createdAt',
      xUserProfile: '&id',
      xUserTweets: '&id',
      xCharacterProfiles: '&characterId',
      xActiveAccount: '&id',
      xAccountList: '&accountId, name, createdAt',
      xNPCs: '&id',
      xAskbox: '&id',
      xAccountProfiles: '&handle, name, updatedAt',
      xAccountAskbox: '&id',
    });
    return db;
  }

  // 原有全局数据库配置函数 - 用于访问API配置和角色信息
  function getDB() {
    return window.db; // 通过window访问
  }

  // 常用DOM操作工具函数
  const DOMUtils = {
    hide: selector => document.querySelectorAll(selector).forEach(el => (el.style.display = 'none')),
    show: (selector, display = 'block') =>
      document.querySelectorAll(selector).forEach(el => (el.style.display = display)),
    removeClass: (selector, className) =>
      document.querySelectorAll(selector).forEach(el => el.classList.remove(className)),
    addClass: (selector, className) => document.querySelectorAll(selector).forEach(el => el.classList.add(className)),
    setStyle: (selector, property, value) =>
      document.querySelectorAll(selector).forEach(el => (el.style[property] = value)),
  };

  // 字符串构建工具函数 - 简化重复的拼接逻辑
  const StringBuilders = {
    // 构建角色信息字符串
    buildCharacterInfo(char, xProfile, userXProfileInfo) {
      let info = `\n角色名：${char.name}`;
      info += `\n本名：${char.originalName}`;
      info += `\n人设：${char.settings.aiPersona || '无特定人设'}`;

      // 情侣认证关系
      if (userXProfileInfo.verificationType === 'couple' && userXProfileInfo.coupleCharacterId === char.id) {
        info += `\n【特殊关系】：该角色是用户的情侣认证对象，所有X平台观众都知道这层关系`;
      }

      // X平台身份信息
      info += `\n【X平台身份（必须严格使用）】：`;
      info += `\n- X用户名：${xProfile.xName}`;
      info += `\n- X句柄：@${xProfile.xHandle}`;
      info += `\n- X头像：${xProfile.xAvatar}`;
      info += `\n- 认证状态：${xProfile.xVerified ? '是' : '否'}`;

      if (xProfile.xBio) info += `\n- X简介：${xProfile.xBio}`;
      if (xProfile.publicIdentity) info += `\n- 公众身份：${xProfile.publicIdentity}`;
      if (xProfile.showRealName && xProfile.realName) {
        info += `\n- 真实姓名：${xProfile.realName}（已公开）`;
      }

      return info;
    },

    // 构建用户身份识别信息
    buildUserIdentityInfo(char, xProfile, userXProfileInfo) {
      const knowsUserIdentity = userXProfileInfo.knownIdentityCharacters.includes(char.id);
      let info = `\n【用户身份识别】：${knowsUserIdentity ? '知道用户身份' : '不知道用户身份'}`;

      if (knowsUserIdentity) {
        info += `\n- 该角色可以识别用户账号 ${userXProfileInfo.handle}（${userXProfileInfo.name}）`;
        info += `\n- 可以根据角色特定的用户人设与用户自然互动，回复时表现出认识`;

        const characterUserPersona = xProfile && xProfile.userPersona ? xProfile.userPersona : '';
        if (characterUserPersona.trim()) {
          info += `\n- 该角色了解的用户信息：${characterUserPersona.substring(0, 150)}${
            characterUserPersona.length > 150 ? '...' : ''
          }`;
        } else {
          info += `\n- 该角色尚未设置用户人设信息，按基础认识模式互动`;
        }
      } else {
        info += `\n- 该角色完全不知道用户的真实身份，按照陌生人模式回复`;
      }

      return info;
    },

    // 构建NPC关系信息
    buildNPCRelationships(xProfile) {
      if (!xProfile.relationships || xProfile.relationships.length === 0) return '';

      let info = `\n【已绑定NPC关系】：`;
      xProfile.relationships.forEach(rel => {
        info += `\n- ${rel.npcName} (${rel.npcHandle}): ${rel.relationshipType}`;
        if (rel.description) info += ` | ${rel.description}`;
      });
      info += `\n注意：当该角色参与回复时，其绑定的NPC也可能出现在回复中，要体现相应的关系特点。`;
      return info;
    },

    // 构建记忆信息
    buildMemoryInfo(char) {
      let info = '';
      if (char.history && char.history.length > 0) {
        const recentHistory = char.history.slice(-10);
        info += '\n最近聊天记忆：';
        recentHistory.forEach(msg => {
          if (msg.role === 'assistant' && msg.content) {
            info += `\n- ${char.name}: ${msg.content.substring(0, 100)}...`;
          }
        });
      }

      if (char.longTermMemory && char.longTermMemory.length > 0) {
        info += '\n长期记忆：';
        char.longTermMemory.forEach(mem => {
          info += `\n- ${mem.content}`;
        });
      }

      return info;
    },

    // 构建完整角色信息（需要从数据库获取数据）
    // scenario: 'tweet' | 'reaction' | 'reply'
    async buildCompleteCharacterInfo(boundCharacters, userXProfileInfo, scenario = 'reply') {
      if (!boundCharacters || boundCharacters.length === 0) return '';

      const mainDB = getDB(); // 用于访问 chats 表
      const xDB = getXDB(); // 用于访问 xCharacterProfiles 表

      // 获取绑定角色的详细信息
      const allChats = await mainDB.chats.toArray();
      const boundCharsData = allChats.filter(chat => !chat.isGroup && boundCharacters.includes(chat.id));

      if (boundCharsData.length === 0) return '';

      // 根据场景选择合适的描述
      let scenarioTitle = '';
      if (scenario === 'tweet') {
        scenarioTitle = '\n\n【绑定角色信息】以下绑定角色可以作为推文发布者，根据其设定和兴趣发布推文：\n';
      } else if (scenario === 'reaction') {
        scenarioTitle =
          '\n\n【绑定角色信息】以下绑定角色可以对推文进行互动（评论、点赞等），根据角色设定和话题相关性决定是否互动：\n';
      } else {
        scenarioTitle = '\n\n【绑定角色信息】以下绑定角色可以参与回复，根据角色设定和话题相关性决定是否回复：\n';
      }

      let charactersInfo = scenarioTitle;

      // 一次性获取所有绑定角色的X资料
      const allXProfiles = await xDB.xCharacterProfiles.toArray();
      const xProfileMap = new Map();
      allXProfiles.forEach(profile => {
        xProfileMap.set(profile.characterId, profile);
      });

      for (const char of boundCharsData) {
        // 从Map中获取角色的X资料
        let xProfile = xProfileMap.get(char.id);
        if (!xProfile) {
          // 如果没有设置X资料，使用默认值
          xProfile = {
            xName: char.name,
            xHandle: char.name.toLowerCase().replace(/\s+/g, '_'),
            xAvatar: char.settings.aiAvatar,
            xVerified: false,
            xBio: '',
            publicIdentity: '',
            showRealName: false,
            realName: '',
            relationships: [],
          };
        }

        // 确保所有字段都存在，为旧数据提供默认值
        if (!xProfile.relationships) {
          xProfile.relationships = [];
        }
        if (xProfile.publicIdentity === undefined) {
          xProfile.publicIdentity = '';
        }
        if (xProfile.showRealName === undefined) {
          xProfile.showRealName = false;
        }
        if (xProfile.realName === undefined) {
          xProfile.realName = '';
        }

        charactersInfo += this.buildCharacterInfo(char, xProfile, userXProfileInfo);
        charactersInfo += this.buildUserIdentityInfo(char, xProfile, userXProfileInfo);
        charactersInfo += this.buildNPCRelationships(xProfile);
        charactersInfo += this.buildMemoryInfo(char);
        charactersInfo += '\n';
      }

      // 根据场景添加不同的要求说明
      if (scenario === 'tweet') {
        charactersInfo += `
【角色发推要求】：
- 角色发推内容要符合其人设、兴趣和性格特点
- 知道用户身份的角色：可以在推文中自然地@用户或提及用户相关话题
- 不知道用户身份的角色：发布独立推文，不涉及用户
- 推文内容应该多样化：日常生活、兴趣爱好、工作学习、情感分享等

【NPC关系互动】：
- 有绑定NPC关系的角色，其NPC可能在其推文下评论互动
- NPC用户名、句柄与关系设定保持一致，头像统一使用默认头像，认证状态为"否"
- 同一NPC保持身份和性格一致性`;
      } else if (scenario === 'reaction') {
        charactersInfo += `
【角色互动要求】：
- 角色互动（评论/点赞）要符合其人设和兴趣，与推文内容相关
- 知道用户身份的角色：在用户发布的推文下可以表现出认识，自然互动
- 不知道用户身份的角色：按照陌生人模式互动，不知道发布者身份
- 互动应该自然真实，就像普通用户一样

【NPC关系互动】：
- 有绑定NPC关系的角色，其NPC可在评论中出现，体现关系特点
- NPC用户名、句柄与关系设定保持一致，头像统一使用默认头像，认证状态为"否"
- 同一NPC保持身份和性格一致性`;
      } else {
        charactersInfo += `
【角色回复要求】：
- 角色回复要自然真实，就像普通用户回复一样
- 知道用户身份的角色：回复时可表现出认识，体现对用户的了解
- 不知道用户身份的角色：按照陌生人模式回复，不知道用户账号信息

【NPC关系互动】：
- 有绑定NPC关系的角色，其NPC可在回复中出现，体现关系特点
- NPC用户名、句柄与关系设定保持一致，头像统一使用默认头像，认证状态为"否"
- 同一NPC保持身份和性格一致性，不认识的NPC间不互相@或提及`;
      }

      return charactersInfo;
    },

    // 构建基础系统提示词（通用版本）- 只包含提示词+世界书
    buildBaseSystemPrompt({ userPrompt, worldSetting }) {
      let systemPrompt = '';

      // 1. 用户自定义提示词
      if (userPrompt.trim()) systemPrompt += userPrompt.trim() + '\n\n';

      // 2. 世界观设定
      systemPrompt += '【世界观设定约束】：';
      if (worldSetting.trim()) {
        systemPrompt += `
${worldSetting.trim()}

上述世界观设定是最高优先级的约束条件，必须严格遵守。`;
      } else {
        systemPrompt += `
无特殊世界观限制，但内容需健康正面，符合社交平台规范。`;
      }

      return systemPrompt;
    },

    // 构建用户X个人资料信息
    buildUserXProfileInfo(userProfileData) {
      return {
        name: userProfileData.name,
        handle: userProfileData.handle,
        avatar: userProfileData.avatar,
        bio: userProfileData.bio,
        verified: userProfileData.verified,
        verificationType: userProfileData.verificationType || 'none',
        coupleCharacterId: userProfileData.coupleCharacterId || '',
        coupleCharacterName: userProfileData.coupleCharacterName || '',
        publicIdentity: userProfileData.publicIdentity || '',
        showRealName: userProfileData.showRealName || false,
        realName: userProfileData.realName || '',
        knownIdentityCharacters: userProfileData.knownIdentityCharacters || [],
      };
    },

    // 构建通用约束条件
    buildUniversalConstraints(userXProfileInfo) {
      const verificationDesc = this.getUserVerificationTypeDescription(userXProfileInfo);

      return `

🚫🚫🚫 【核心禁令 - 最高优先级】 🚫🚫🚫
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
**绝对禁止以用户身份生成任何内容！**

用户身份标识（禁止使用）：
- 用户名标识：[USER_NAME_RESTRICTED]
- 用户句柄标识：[USER_HANDLE_RESTRICTED]
- 用户信息：仅供理解上下文，严禁在生成内容中使用

**你只能生成以下身份的内容**：
✅ 绑定角色（使用提供的xName、xHandle、xAvatar等）
✅ 虚构的普通X平台用户（自创用户名和句柄）
❌ 绝对不能生成用户本人发表的任何推文/评论/回复
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

【用户X平台公开身份】（所有观众都知道的公开信息）：
- 认证状态：${userXProfileInfo.verified ? '已认证' : '未认证'}
- 认证类型：${verificationDesc}
${
  userXProfileInfo.verificationType === 'couple' && userXProfileInfo.coupleCharacterName
    ? `- 情侣关系：与${userXProfileInfo.coupleCharacterName}为公开情侣（观众可知）`
    : ''
}
${userXProfileInfo.publicIdentity ? `- 公众身份：${userXProfileInfo.publicIdentity}` : ''}
${userXProfileInfo.bio ? `- 个人简介：${userXProfileInfo.bio}` : ''}

【权限分级】：
- 观众可知：认证状态、简介、公众身份、公开的情侣关系
- 观众禁知：角色人设、聊天记忆、性格细节、私人对话、用户专属人设`;
    },

    // 获取认证类型描述
    getUserVerificationTypeDescription(userXProfileInfo) {
      switch (userXProfileInfo.verificationType) {
        case 'verified':
          return '蓝色勾标认证';
        case 'couple':
          return '情侣认证';
        case 'married':
          return '已婚认证';
        case 'vip':
          return 'VIP认证';
        default:
          return '无认证';
      }
    },

    // 构建场景分支提示词
    buildScenarioPrompt({ isOwnPost, commentType, pageType, parentComment, targetCommentEl }) {
      let scenarioPrompt = '\n\n【场景识别】：';

      if (isOwnPost && commentType === 'main_comment') {
        scenarioPrompt += `用户在自己发布的推文下方发表了评论。
【任务】：生成其他用户对她评论的反应回复，或新的话题相关评论。`;
      } else if (isOwnPost && commentType === 'reply_comment') {
        scenarioPrompt += `用户在自己发布的推文的评论区楼中楼发表了回复。
【任务】：生成其他用户对这条楼中楼回复的反应，或话题相关的新回复。`;
      } else if (!isOwnPost && commentType === 'main_comment') {
        scenarioPrompt += `用户在别人发布的推文下方发表了评论。
【任务】：生成其他用户（包括原推作者）对此评论的互动回复。`;
      } else if (!isOwnPost && commentType === 'reply_comment') {
        scenarioPrompt += `用户在别人发布的推文的评论区楼中楼发表了回复。
【任务】：生成其他用户对此楼中楼回复的反应，可能包括被回复者本人。`;
      }

      // 添加通用生成要求
      scenarioPrompt += `

【生成要求】：
1. 社交真实性：模拟真实的X平台用户互动，语言自然流畅
2. 情绪共鸣：根据原推内容和用户评论，生成有情感共鸣的回应
3. 多样化互动：可以是赞同、反对、补充、提问、调侃等多种类型
4. 身份一致：每个角色回复都要符合其设定的身份和性格特点
5. 避免重复：多个回复之间保持内容和表达方式的差异性

【格式要求】：
- 每条回复独立成段，以"【回复X】"开头标记
- 严格按照角色的X平台身份信息生成，不得擅自修改用户名、句柄等
- 回复长度适中，符合社交媒体特点（一般20-200字）
- 可以适当使用emoji表情，但不要过度`;

      return scenarioPrompt;
    },
  };

  // HTML模板生成工具 - 简化重复的DOM创建
  const TemplateBuilders = {
    // 构建角色选择项模板
    buildCharacterItem(character, isChecked = false) {
      const itemId = `character-item-${character.id}`;
      const avatarId = `character-avatar-${character.id}`;

      setTimeout(() => {
        // 添加事件处理器
        const item = document.getElementById(itemId);
        const avatar = document.getElementById(avatarId);

        if (item) {
          EventUtils.addHoverEffect(
            item,
            { backgroundColor: 'rgba(255,255,255,0.05)' },
            { backgroundColor: 'transparent' },
          );
          EventUtils.safeAddEventListener(item, 'click', () => toggleCharacterSelection(character.id));
        }

        if (avatar) {
          EventUtils.safeAddEventListener(avatar, 'contextmenu', e => {
            e.preventDefault();
            openCharacterXProfile(character.id);
            return false;
          });

          // 长按事件
          let longPressTimer;
          EventUtils.safeAddEventListener(avatar, 'mousedown', () => {
            longPressTimer = setTimeout(() => openCharacterXProfile(character.id), 500);
          });
          EventUtils.safeAddEventListener(avatar, 'mouseup', () => clearTimeout(longPressTimer));
          EventUtils.safeAddEventListener(avatar, 'mouseleave', () => clearTimeout(longPressTimer));
          EventUtils.safeAddEventListener(avatar, 'touchstart', () => {
            longPressTimer = setTimeout(() => openCharacterXProfile(character.id), 500);
          });
          EventUtils.safeAddEventListener(avatar, 'touchend', () => clearTimeout(longPressTimer));
        }
      }, 0);

      return `
            <div id="${itemId}" class="character-item" style="display: flex; align-items: center; gap: 12px; padding: 12px; border: 1px solid #333; border-radius: 8px; margin-bottom: 8px; cursor: pointer; transition: all 0.2s;">
              <img id="${avatarId}" src="${character.settings.aiAvatar}" alt="${character.name}" 
                   style="width: 40px; height: 40px; border-radius: 50%; flex-shrink: 0; cursor: pointer;"
                   title="长按设置X资料">
              <div style="flex: 1; min-width: 0;">
                <div style="color: #fff; font-weight: 600; font-size: 15px; margin-bottom: 2px;">${character.name}</div>
                <div style="color: #71767b; font-size: 13px; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">
                  ${character.originalName}
                </div>
                <div style="color: #1d9bf0; font-size: 11px; margin-top: 2px;">
                  长按头像设置X资料
                </div>
              </div>
              ${this.buildCheckbox(character.id, isChecked)}
            </div>
          `;
    },

    // 构建复选框
    buildCheckbox(characterId, isChecked) {
      return `
            <div class="character-checkbox" data-character-id="${characterId}" style="
              width: 20px; 
              height: 20px; 
              border: 2px solid ${isChecked ? '#1d9bf0' : '#71767b'}; 
              border-radius: 4px; 
              display: flex; 
              align-items: center; 
              justify-content: center;
              background-color: ${isChecked ? '#1d9bf0' : 'transparent'};
              transition: all 0.2s;
            ">
              ${
                isChecked
                  ? '<svg viewBox="0 0 24 24" style="width: 12px; height: 12px; fill: #fff;"><path d="M9 16.17L5.53 12.7l-1.06 1.06L9 18.3l9.54-9.54-1.06-1.06L9 16.17z"/></svg>'
                  : ''
              }
            </div>
          `;
    },

    // 构建角色信息显示
    buildCharacterInfoDisplay(character) {
      return `
            <div style="display: flex; align-items: center; gap: 16px;">
              <img src="${character.settings.aiAvatar}" alt="${character.name}" style="width: 60px; height: 60px; border-radius: 50%;">
              <div>
                <div style="color: #fff; font-size: 18px; font-weight: 600; margin-bottom: 4px;">${character.name}</div>
                <div style="color: #71767b; font-size: 14px;">本名：${character.originalName}</div>
                <div style="color: #71767b; font-size: 14px;">设置该角色在X平台的专属身份资料</div>
              </div>
            </div>
          `;
    },

    // 构建空状态提示
    buildEmptyState(message) {
      return `<p style="color: #71767b; text-align: center; padding: 20px;">${message}</p>`;
    },

    // 构建错误状态提示
    buildErrorState(message) {
      return `<p style="color: #f4212e; text-align: center; padding: 20px;">${message}</p>`;
    },
  };

  // 验证和错误处理工具 - 简化重复验证逻辑
  const ValidationUtils = {
    // 验证必需字段
    validateRequired(fields) {
      const missing = [];
      for (const [key, value] of Object.entries(fields)) {
        if (!value || value.trim() === '') {
          missing.push(key);
        }
      }
      return {
        isValid: missing.length === 0,
        missing: missing,
      };
    },

    // 验证句柄格式
    validateHandle(handle) {
      if (!handle) return { isValid: false, error: '句柄不能为空' };
      if (handle.length > 15) return { isValid: false, error: '句柄长度不能超过15个字符' };
      if (!/^[a-zA-Z0-9_]+$/.test(handle)) return { isValid: false, error: '句柄只能包含字母、数字和下划线' };
      return { isValid: true };
    },

    // 验证名称长度
    validateName(name, maxLength = 30) {
      if (!name) return { isValid: false, error: '名称不能为空' };
      if (name.length > maxLength) return { isValid: false, error: `名称长度不能超过${maxLength}个字符` };
      return { isValid: true };
    },

    // 安全的数据解析
    safeParseJSON(jsonString, defaultValue = null) {
      try {
        return JSON.parse(jsonString);
      } catch (error) {
        console.error('JSON解析失败:', error);
        return defaultValue;
      }
    },

    // 安全的DOM操作
    safeGetElement(id) {
      const element = document.getElementById(id);
      if (!element) {
        console.warn(`未找到元素: ${id}`);
      }
      return element;
    },

    // 统一错误处理
    handleError(error, context = '') {
      console.error(`${context} 错误:`, error);
      showXToast(`${context}失败: ${error.message}`, 'error');
    },
  };

  // 事件处理工具 - 简化重复的事件处理逻辑
  const EventUtils = {
    // 添加悬停效果
    addHoverEffect(element, hoverStyle = {}, defaultStyle = {}) {
      if (!element) return;

      element.addEventListener('mouseover', () => {
        Object.assign(element.style, hoverStyle);
      });

      element.addEventListener('mouseout', () => {
        Object.assign(element.style, defaultStyle);
      });
    },

    // 批量添加悬停效果
    addHoverEffectBatch(selector, hoverStyle = {}, defaultStyle = {}) {
      document.querySelectorAll(selector).forEach(element => {
        this.addHoverEffect(element, hoverStyle, defaultStyle);
      });
    },

    // 添加按钮悬停效果（通用样式）
    addButtonHover(element) {
      this.addHoverEffect(
        element,
        {
          backgroundColor: 'rgba(255,255,255,0.1)',
        },
        {
          backgroundColor: 'transparent',
        },
      );
    },

    // 添加链接下划线悬停效果
    addLinkUnderlineHover(element, targetSelector = 'span') {
      if (!element) return;

      element.addEventListener('mouseover', () => {
        const target = targetSelector ? element.querySelector(targetSelector) : element;
        if (target) target.style.textDecoration = 'underline';
      });

      element.addEventListener('mouseout', () => {
        const target = targetSelector ? element.querySelector(targetSelector) : element;
        if (target) target.style.textDecoration = 'none';
      });
    },

    // 安全的事件监听器添加
    safeAddEventListener(element, event, handler) {
      if (element && typeof handler === 'function') {
        element.addEventListener(event, handler);
      }
    },

    // 防抖函数
    debounce(func, wait) {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    },

    // 节流函数
    throttle(func, limit) {
      let inThrottle;
      return function executedFunction(...args) {
        if (!inThrottle) {
          func.apply(this, args);
          inThrottle = true;
          setTimeout(() => (inThrottle = false), limit);
        }
      };
    },
  };

  // 数据处理工具 - 简化重复的数据处理逻辑
  const DataUtils = {
    // 格式化数字显示
    formatNumber(num) {
      if (num === undefined || num === null) return '0';
      if (num < 1000) return num.toString();
      if (num < 1000000) return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
      if (num < 1000000000) return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
      return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
    },

    // 格式化时间显示
    formatTime(dateString) {
      const date = new Date(dateString);
      const now = new Date();
      const diffInSeconds = Math.floor((now - date) / 1000);

      if (diffInSeconds < 60) return '刚刚';
      if (diffInSeconds < 3600) return Math.floor(diffInSeconds / 60) + '分钟前';
      if (diffInSeconds < 86400) return Math.floor(diffInSeconds / 3600) + '小时前';
      if (diffInSeconds < 2592000) return Math.floor(diffInSeconds / 86400) + '天前';

      return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    },

    // 生成唯一ID
    generateId(prefix = 'id') {
      return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    },

    // 深拷贝对象
    deepClone(obj) {
      if (obj === null || typeof obj !== 'object') return obj;
      if (obj instanceof Date) return new Date(obj.getTime());
      if (obj instanceof Array) return obj.map(item => this.deepClone(item));
      if (typeof obj === 'object') {
        const clonedObj = {};
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            clonedObj[key] = this.deepClone(obj[key]);
          }
        }
        return clonedObj;
      }
    },

    // 数组去重
    uniqueArray(arr, key = null) {
      if (key) {
        const seen = new Set();
        return arr.filter(item => {
          const keyValue = item[key];
          if (seen.has(keyValue)) {
            return false;
          }
          seen.add(keyValue);
          return true;
        });
      }
      return [...new Set(arr)];
    },

    // 安全获取嵌套对象属性
    safeGet(obj, path, defaultValue = null) {
      const keys = path.split('.');
      let result = obj;
      for (const key of keys) {
        if (result === null || result === undefined || !result.hasOwnProperty(key)) {
          return defaultValue;
        }
        result = result[key];
      }
      return result;
    },

    // 数据排序
    sortBy(arr, key, ascending = true) {
      return arr.sort((a, b) => {
        const aVal = this.safeGet(a, key);
        const bVal = this.safeGet(b, key);

        if (aVal < bVal) return ascending ? -1 : 1;
        if (aVal > bVal) return ascending ? 1 : -1;
        return 0;
      });
    },

    // 分页数据
    paginate(arr, page = 1, limit = 10) {
      const offset = (page - 1) * limit;
      return {
        data: arr.slice(offset, offset + limit),
        pagination: {
          page,
          limit,
          total: arr.length,
          totalPages: Math.ceil(arr.length / limit),
          hasNext: offset + limit < arr.length,
          hasPrev: page > 1,
        },
      };
    },
  };

  // 性能优化工具 - 提升代码执行效率
  const PerformanceUtils = {
    // 缓存机制
    cache: new Map(),

    // 设置缓存
    setCache(key, value, ttl = 300000) {
      // 默认5分钟过期
      this.cache.set(key, {
        value,
        expiry: Date.now() + ttl,
      });
    },

    // 获取缓存
    getCache(key) {
      const item = this.cache.get(key);
      if (!item) return null;

      if (Date.now() > item.expiry) {
        this.cache.delete(key);
        return null;
      }

      return item.value;
    },

    // 清理过期缓存
    cleanExpiredCache() {
      const now = Date.now();
      for (const [key, item] of this.cache.entries()) {
        if (now > item.expiry) {
          this.cache.delete(key);
        }
      }
    },

    // 批量DOM操作
    batchDOMUpdate(updates) {
      const fragment = document.createDocumentFragment();
      updates.forEach(update => {
        if (typeof update === 'function') {
          update(fragment);
        }
      });
      return fragment;
    },

    // 延迟执行
    defer(callback, delay = 0) {
      return setTimeout(callback, delay);
    },

    // 请求空闲时间执行
    idle(callback) {
      if (window.requestIdleCallback) {
        return window.requestIdleCallback(callback);
      } else {
        return setTimeout(callback, 1);
      }
    },

    // 监控性能
    measurePerformance(name, fn) {
      return async (...args) => {
        const start = performance.now();
        try {
          const result = await fn(...args);
          const end = performance.now();
          console.log(`Performance [${name}]: ${(end - start).toFixed(2)}ms`);
          return result;
        } catch (error) {
          const end = performance.now();
          console.error(`Performance [${name}] Error: ${(end - start).toFixed(2)}ms`, error);
          throw error;
        }
      };
    },
  };

  // 定期清理缓存
  setInterval(() => PerformanceUtils.cleanExpiredCache(), 60000); // 每分钟清理一次

  // === 核心业务逻辑函数 ===

  // 页面切换函数

  // 切换X社交页面的函数 - 优化后
  function switchXPage(pageType) {
    // 隐藏所有页面，显示选中页面
    DOMUtils.hide('.x-page');
    const targetPage = document.getElementById('x-' + pageType + '-page');
    if (targetPage) targetPage.style.display = 'flex';

    // 获取顶部栏和底部导航栏
    const topBar = document.querySelector('.x-top-bar');
    const bottomNav = document.querySelector('.x-bottom-nav');
    const refreshBtn = document.querySelector('.refresh-trends-btn');

    // 如果是提问箱页面，隐藏顶部栏和底部导航栏
    if (pageType === 'askbox') {
      if (topBar) topBar.style.display = 'none';
      if (bottomNav) bottomNav.style.display = 'none';
      if (refreshBtn) refreshBtn.style.display = 'none';
    } else {
      // 其他页面显示顶部栏和底部导航栏
      if (topBar) topBar.style.display = 'flex';
      if (bottomNav) bottomNav.style.display = 'flex';

      // 只在搜索页面显示刷新按钮
      if (refreshBtn) {
        refreshBtn.style.display = pageType === 'search' ? 'flex' : 'none';
      }
    }

    // 重置导航样式
    DOMUtils.removeClass('.x-nav-item', 'active');
    DOMUtils.setStyle('.x-nav-item svg', 'fill', '#fff');
    DOMUtils.hide('.nav-highlight');

    // 页面索引映射
    const pageIndexMap = { home: 0, search: 1, notifications: 2, messages: 3, settings: -1, profile: -1, askbox: -1 };
    const targetIndex = pageIndexMap[pageType];

    if (pageType === 'profile') {
      setTimeout(() => {
        loadUserProfileToUI(); // 刷新用户资料显示
        loadUserProfileTweets(); // 加载用户推文
      }, 100);
    } else if (pageType === 'askbox') {
      // 加载提问箱数据
      setTimeout(() => {
        loadAskboxData();
      }, 100);
    } else if (pageType === 'search') {
      // 加载搜索页面数据
      setTimeout(() => {
        initSearchPage();
      }, 100);
    }

    // 切换到设置页面时，重新加载X设置（按账号加载）
    if (pageType === 'settings') {
      setTimeout(async () => {
        await initializeXSettings();
        console.log('✅ 已加载当前账号的X设置');
      }, 100);
    }

    // 高亮当前导航项
    const navItems = document.querySelectorAll('.x-nav-item');
    if (navItems[targetIndex] && targetIndex >= 0) {
      navItems[targetIndex].classList.add('active');
      navItems[targetIndex].querySelector('svg').style.fill = '#1d9bf0';
      navItems[targetIndex].querySelector('.nav-highlight').style.display = 'block';
    }
  }

  // 添加主页标签切换功能
  function switchHomeTab(tabName) {
    // 重置所有标签和内容
    DOMUtils.removeClass('.x-tab', 'active');
    DOMUtils.setStyle('.x-tab', 'color', '#71767b');
    DOMUtils.hide('.tab-indicator');
    DOMUtils.hide('.tab-content');

    // 激活选中的标签
    const tabs = document.querySelectorAll('.x-tab');
    const tabIndex = tabName === 'for-you' ? 0 : 1;
    const contentId = tabName === 'for-you' ? 'for-you-content' : 'following-content';

    if (tabs[tabIndex]) {
      tabs[tabIndex].classList.add('active');
      tabs[tabIndex].style.color = '#fff';
      tabs[tabIndex].querySelector('.tab-indicator').style.display = 'block';
    }

    const content = document.getElementById(contentId);
    if (content) content.style.display = 'flex';
  }

  // ============================================
  // 搜索页面功能
  // ============================================

  // 热搜数据
  let currentSearchTab = 'recommended';
  let trendingData = {
    recommended: [
      {
        id: 't1',
        category: '娱乐 · 热门话题',
        title: '流行电影讨论',
        count: 125600,
      },
      {
        id: 't2',
        category: '体育 · 实时',
        title: '篮球比赛精彩瞬间',
        count: 89200,
      },
      {
        id: 't3',
        category: '科技 · 趋势',
        title: 'AI技术新突破',
        count: 256700,
      },
      {
        id: 't4',
        category: '音乐 · 流行',
        title: '新专辑发布',
        count: 67800,
      },
      {
        id: 't5',
        category: '游戏 · 热门',
        title: '年度游戏评选',
        count: 145300,
      },
    ],
    trending: [
      {
        id: 't6',
        category: '全球 · 趋势',
        title: '国际新闻热点',
        count: 892300,
      },
      {
        id: 't7',
        category: '商业 · 财经',
        title: '股市最新动态',
        count: 234500,
      },
      {
        id: 't8',
        category: '社会 · 讨论',
        title: '社会话题关注',
        count: 456700,
      },
      {
        id: 't9',
        category: '文化 · 热议',
        title: '传统文化传承',
        count: 178900,
      },
      {
        id: 't10',
        category: '健康 · 生活',
        title: '养生健康小贴士',
        count: 123400,
      },
    ],
  };

  // 自定义分类数据
  let customCategories = [];

  // 搜索相关数据
  let currentSearchQuery = '';
  let currentSearchResultTab = 'top';
  let searchResultsData = {
    top: [],
    latest: [],
    users: [],
  };

  // 切换搜索标签
  function switchSearchTab(tabName) {
    currentSearchTab = tabName;

    // 更新标签样式
    const tabs = document.querySelectorAll('.search-tab');
    tabs.forEach(tab => {
      tab.classList.remove('active');
    });

    const activeTab = Array.from(tabs).find(tab => tab.onclick && tab.onclick.toString().includes(tabName));
    if (activeTab) {
      activeTab.classList.add('active');
    }

    // 渲染对应的热搜列表
    renderTrendingList();
  }

  // 渲染热搜列表
  function renderTrendingList() {
    const container = document.getElementById('trending-list');
    if (!container) return;

    const trends = trendingData[currentSearchTab] || [];

    if (trends.length === 0) {
      container.innerHTML = `
        <div style="display: flex; justify-content: center; align-items: center; padding: 40px 20px; color: #71767b;">
          暂无热搜内容
        </div>
      `;
      return;
    }

    container.innerHTML = trends
      .map(
        trend => `
      <div class="trending-item" onclick="handleTrendingClick('${trend.id}')">
        <div class="trending-header">
          <div class="trending-category">${trend.category}</div>
          <div class="trending-more" onclick="event.stopPropagation(); handleTrendingMore('${trend.id}')">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <g><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></g>
            </svg>
          </div>
        </div>
        <div class="trending-title">${trend.title}</div>
        <div class="trending-count">${formatNumber(trend.count)} 条帖子</div>
      </div>
    `,
      )
      .join('');
  }

  // 刷新热搜（第五个情景：热搜生成器）
  async function refreshTrends() {
    const refreshBtn = document.querySelector('.refresh-trends-btn');
    if (!refreshBtn) return;

    // 添加旋转动画
    refreshBtn.classList.add('spinning');

    try {
      // 1. 读取API配置和X设置
      const db = getDB(); // 用于访问API配置
      const xDb = getXDB(); // 用于访问X专用设置

      const apiConfig = await db.apiConfig.get('main');
      if (!apiConfig || !apiConfig.proxyUrl || !apiConfig.apiKey || !apiConfig.model) {
        showXToast('请先配置API设置', 'error');
        return;
      }

      const { proxyUrl, apiKey, model } = apiConfig;

      // 2. 从X设置中读取配置（按账号读取）
      const settingsId = `xSettings_${currentAccountId || 'main'}`;
      const xSettings = await xDb.xSettings.get(settingsId);
      const userPrompt = xSettings?.systemPrompt || '';
      const worldSetting = xSettings?.worldSetting || '';
      const boundCharacters = xSettings?.boundCharacters || [];

      // 3. 构建用户X个人资料信息
      const userXProfileInfo = StringBuilders.buildUserXProfileInfo(window.userProfileData);

      // 4. 判断用户是否为大曝光身份（明星/网红等公众人物）
      const publicIdentity = userXProfileInfo.publicIdentity || '';
      const bio = userXProfileInfo.bio || '';
      const isPublicFigure =
        /明星|网红|博主|演员|歌手|艺人|主播|up主|偶像|导演|制片|编剧|作家|influencer|celebrity|singer|actor|artist|streamer|idol/i.test(
          publicIdentity + ' ' + bio,
        );

      console.log('🎭 用户公众身份检测:', {
        isPublicFigure,
        publicIdentity,
        bio,
      });

      // 5. 构建基础系统提示词（提示词 + 世界观）
      let systemPrompt = StringBuilders.buildBaseSystemPrompt({
        userPrompt,
        worldSetting,
      });

      // 6. 获取启用的自定义分类
      const enabledCustomCategories = customCategories.filter(cat => cat.enabled && cat.name);

      // 7. 添加热搜生成任务说明
      systemPrompt += `

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 核心任务说明 🎯
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
你是X社交平台的热搜生成器。请生成当前的热门话题列表。

【生成要求】：
- 为"为你推荐"和"当前趋势"各生成5条热搜
${
  enabledCustomCategories.length > 0
    ? `- 同时为以下自定义分类各生成5条热搜：${enabledCustomCategories.map(c => `"${c.name}"`).join('、')}`
    : ''
}
- 热搜话题要多样化，涵盖不同领域和分类
- 热搜数量（帖子数）要符合真实社交平台规模（1万到100万之间）
- 话题标题要简洁有力，符合社交媒体特点
${
  isPublicFigure
    ? '- 用户或绑定角色是公众人物，可以适当生成1-2条相关热搜（占比约20%）'
    : '- 用户和角色不是公众人物，生成通用热门话题即可，不要涉及用户或角色'
}

【热搜分类示例】：
- 娱乐 · 热门话题：电影、音乐、综艺、明星动态
- 体育 · 实时：比赛、运动员、体育赛事
- 科技 · 趋势：新技术、产品发布、科技新闻
- 社会 · 讨论：时事、民生、社会话题
- 游戏 · 热门：游戏更新、电竞、游戏新闻
- 文化 · 热议：艺术、文学、传统文化
- 音乐 · 流行：新歌、演唱会、音乐人动态
- 美食 · 推荐：美食探店、烹饪技巧
- 旅游 · 探索：旅行目的地、旅游攻略
- 时尚 · 潮流：穿搭、时装周、潮流单品
- 健康 · 生活：养生、健身、生活方式
- 全球 · 趋势：国际新闻、全球热点
- 商业 · 财经：经济动态、商业新闻
- 教育 · 学习：学习方法、教育资讯
${
  enabledCustomCategories.length > 0
    ? `
【自定义分类详细说明】：${enabledCustomCategories
        .map(
          cat => `
- ${cat.name}：${cat.description || '生成该分类下的热门话题'}`,
        )
        .join('')}
`
    : ''
}
`;

      // 8. 如果是公众人物，添加用户和角色信息
      if (isPublicFigure) {
        systemPrompt += `

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 公众人物信息（可用于生成相关热搜）
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

【用户公开信息】：
- 用户名：${userXProfileInfo.name}
- 用户句柄：${userXProfileInfo.handle}
- 公众身份：${userXProfileInfo.publicIdentity}
${userXProfileInfo.bio ? `- 个人简介：${userXProfileInfo.bio}` : ''}
${
  userXProfileInfo.verificationType !== 'none'
    ? `- 认证状态：${StringBuilders.getUserVerificationTypeDescription(userXProfileInfo)}`
    : ''
}
${
  userXProfileInfo.verificationType === 'couple' && userXProfileInfo.coupleCharacterName
    ? `- 情侣关系：与${userXProfileInfo.coupleCharacterName}为公开情侣`
    : ''
}
`;

        // 9. 如果有绑定角色，读取角色X资料
        if (boundCharacters.length > 0) {
          const allXProfiles = await xDb.xCharacterProfiles.toArray();
          const characterProfiles = [];

          for (const charId of boundCharacters) {
            const xProfile = allXProfiles.find(p => p.characterId === charId);
            if (xProfile && xProfile.publicIdentity) {
              // 只添加有公众身份的角色
              const isCharPublicFigure =
                /明星|网红|博主|演员|歌手|艺人|主播|up主|偶像|导演|制片|编剧|作家|influencer|celebrity|singer|actor|artist|streamer|idol/i.test(
                  xProfile.publicIdentity,
                );

              if (isCharPublicFigure) {
                characterProfiles.push({
                  name: xProfile.xName,
                  handle: xProfile.xHandle,
                  publicIdentity: xProfile.publicIdentity,
                });
              }
            }
          }

          if (characterProfiles.length > 0) {
            systemPrompt += `
【绑定角色公开信息】（同样是公众人物）：
`;
            characterProfiles.forEach(char => {
              systemPrompt += `- ${char.name} (${char.handle})：${char.publicIdentity}
`;
            });
          }
        }

        systemPrompt += `
【公众人物热搜规则】：
- 可以生成与用户或角色相关的热搜话题（1-2条，占比约20%）
- 话题应该基于公众身份信息，符合其领域和形象
- 不要泄露私密人设、聊天记忆等非公开信息
- 热搜内容要真实可信，像真正的社交平台热搜
- 其余80%的热搜应该是与用户/角色无关的通用热门话题
`;
      }

      // 10. 添加格式要求
      let jsonFormat = `{
  "recommended": [
    {
      "category": "分类 · 标签",
      "title": "热搜话题标题",
      "count": 数字（帖子数量，1万-100万之间）
    }
  ],
  "trending": [
    {
      "category": "分类 · 标签",
      "title": "热搜话题标题",
      "count": 数字（帖子数量，1万-100万之间）
    }
  ]`;

      // 如果有自定义分类，添加到JSON格式中
      if (enabledCustomCategories.length > 0) {
        enabledCustomCategories.forEach(cat => {
          jsonFormat += `,
  "${cat.id}": [
    {
      "category": "分类 · 标签",
      "title": "热搜话题标题",
      "count": 数字（帖子数量，1万-100万之间）
    }
  ]`;
        });
      }

      jsonFormat += `
}`;

      systemPrompt += `

【返回格式】：严格JSON格式，不要添加任何其他文字说明

${jsonFormat}

**注意事项**：
1. category格式：分类 · 标签（例如："娱乐 · 热门话题"）
2. title要简洁有力，不超过20个字
3. count必须是纯数字，不带引号，范围在10000-1000000之间
4. 每个数组包含5个热搜项
5. 话题要多样化，不要集中在某一领域
6. 确保返回纯JSON，不要有markdown代码块标记
${enabledCustomCategories.length > 0 ? `7. 自定义分类的热搜要紧密围绕分类主题和描述，确保内容相关性` : ''}

【最终检查】：确认话题真实可信，分类准确，数量合理，${worldSetting.trim() ? '严格遵守世界观设定，' : ''}格式正确。
`;

      const messages = [{ role: 'user', content: '请生成最新的X平台热搜话题列表' }];

      // 11. 发送API请求
      let isGemini = proxyUrl.includes('generativelanguage');
      let response;

      if (isGemini) {
        const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models';
        const apiKeyValue = typeof getRandomValue === 'function' ? getRandomValue(apiKey) : apiKey;
        const geminiConfig = {
          url: `${GEMINI_API_URL}/${model}:generateContent?key=${apiKeyValue}`,
          data: {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: systemPrompt + '\n\n' + messages.map(m => m.content).join('\n'),
                    },
                  ],
                },
              ],
              generationConfig: {
                temperature: 0.9,
              },
            }),
          },
        };
        response = await fetch(geminiConfig.url, geminiConfig.data);
      } else {
        const openAiPayload = {
          model: model,
          messages: [{ role: 'system', content: systemPrompt }, ...messages],
          temperature: 0.9,
          stream: false,
        };
        response = await fetch(`${proxyUrl}/v1/chat/completions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify(openAiPayload),
        });
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API错误: ${response.status} - ${errorData.error?.message || response.statusText}`);
      }

      const data = await response.json();
      let aiResponseContent;

      if (isGemini) {
        // Gemini格式
        if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) {
          aiResponseContent = data.candidates[0].content.parts[0].text || '';
        }
      } else {
        // OpenAI格式
        aiResponseContent = data.choices?.[0]?.message?.content || '';
      }

      console.log('🔥 AI热搜响应:', aiResponseContent);

      // 12. 解析JSON响应
      const cleanedResponse = aiResponseContent
        .replace(/```json\s*/i, '')
        .replace(/```\s*$/, '')
        .trim();

      if (!cleanedResponse) {
        throw new Error('AI返回了空的响应内容');
      }

      let newTrendsData;
      try {
        newTrendsData = JSON.parse(cleanedResponse);
      } catch (parseError) {
        console.error('JSON解析失败:', parseError);
        console.error('尝试解析的内容:', cleanedResponse.substring(0, 500) + '...');
        throw new Error(`AI返回的数据不是有效的JSON格式: ${parseError.message}`);
      }

      // 13. 验证数据格式
      if (!newTrendsData.recommended || !newTrendsData.trending) {
        throw new Error('AI返回的数据格式不正确，缺少必要字段');
      }

      if (!Array.isArray(newTrendsData.recommended) || !Array.isArray(newTrendsData.trending)) {
        throw new Error('热搜数据格式错误：recommended和trending必须是数组');
      }

      // 验证自定义分类数据
      if (enabledCustomCategories.length > 0) {
        for (const category of enabledCustomCategories) {
          if (!newTrendsData[category.id]) {
            console.warn(`⚠️ AI未返回自定义分类"${category.name}"的数据`);
          } else if (!Array.isArray(newTrendsData[category.id])) {
            console.warn(`⚠️ 自定义分类"${category.name}"的数据格式错误`);
          }
        }
      }

      // 14. 为热搜添加唯一ID
      const timestamp = Date.now();
      newTrendsData.recommended = newTrendsData.recommended.map((trend, index) => ({
        ...trend,
        id: `rec_${timestamp}_${index}`,
      }));

      newTrendsData.trending = newTrendsData.trending.map((trend, index) => ({
        ...trend,
        id: `trend_${timestamp}_${index}`,
      }));

      // 为自定义分类添加唯一ID
      enabledCustomCategories.forEach(category => {
        if (newTrendsData[category.id] && Array.isArray(newTrendsData[category.id])) {
          newTrendsData[category.id] = newTrendsData[category.id].map((trend, index) => ({
            ...trend,
            id: `${category.id}_${timestamp}_${index}`,
          }));
        }
      });

      // 15. 更新全局热搜数据
      trendingData.recommended = newTrendsData.recommended;
      trendingData.trending = newTrendsData.trending;

      // 更新自定义分类数据
      enabledCustomCategories.forEach(category => {
        if (newTrendsData[category.id]) {
          trendingData[category.id] = newTrendsData[category.id];
        }
      });

      // 16. 保存到数据库
      try {
        const saveData = {
          id: 'trends',
          recommended: newTrendsData.recommended,
          trending: newTrendsData.trending,
          lastUpdated: new Date().toISOString(),
        };

        // 添加自定义分类数据
        enabledCustomCategories.forEach(category => {
          if (newTrendsData[category.id]) {
            saveData[category.id] = newTrendsData[category.id];
          }
        });

        await xDb.xTweetsData.put(saveData);
        console.log('✅ 热搜数据已保存到数据库', {
          默认分类: 2,
          自定义分类: enabledCustomCategories.length,
        });
      } catch (saveError) {
        console.error('⚠️ 保存热搜数据失败:', saveError);
        // 不影响主流程，继续执行
      }

      // 17. 重新渲染热搜列表
      renderTrendingList();

      showXToast('热搜已刷新', 'success');
    } catch (error) {
      console.error('❌ 刷新热搜失败:', error);
      showXToast(`刷新失败: ${error.message}`, 'error');
    } finally {
      // 移除旋转动画
      if (refreshBtn) {
        refreshBtn.classList.remove('spinning');
      }
    }
  }

  // 处理热搜点击
  function handleTrendingClick(trendId) {
    console.log('点击热搜:', trendId);

    // 查找热搜数据
    let trendItem = null;
    for (const category in trendingData) {
      const found = trendingData[category].find(t => t.id === trendId);
      if (found) {
        trendItem = found;
        break;
      }
    }

    if (!trendItem) {
      console.error('未找到热搜数据:', trendId);
      return;
    }

    // 将热搜标题填入搜索框
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.value = trendItem.title;
      toggleSearchButton(); // 显示搜索按钮
    }

    // 自动执行搜索
    performSearch();
  }

  // 处理热搜更多选项
  function handleTrendingMore(trendId) {
    console.log('热搜更多选项:', trendId);
    showXToast('更多选项功能待开发', 'info');
  }

  // 显示/隐藏搜索按钮
  function toggleSearchButton() {
    const input = document.getElementById('search-input');
    const button = document.getElementById('search-submit-btn');

    if (input && button) {
      if (input.value.trim()) {
        button.style.display = 'flex';
      } else {
        button.style.display = 'none';
      }
    }
  }

  // 切换搜索结果标签
  function switchSearchResultTab(tabName) {
    currentSearchResultTab = tabName;

    // 更新标签样式
    const tabs = document.querySelectorAll('#search-results-view .search-tab');
    tabs.forEach((tab, index) => {
      const tabNames = ['top', 'latest', 'users'];
      if (tabNames[index] === tabName) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    // 渲染对应的搜索结果
    renderSearchResults();
  }

  // 渲染搜索结果
  function renderSearchResults() {
    const container = document.getElementById('search-results-content');
    if (!container) return;

    const results = searchResultsData[currentSearchResultTab] || [];

    if (results.length === 0) {
      container.innerHTML = `
        <div style="
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 20px;
          color: #71767b;
        ">
          <svg viewBox="0 0 24 24" style="width: 80px; height: 80px; fill: #71767b; margin-bottom: 20px;">
            <g><path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"></path></g>
          </svg>
          <div style="font-size: 20px; font-weight: 600; margin-bottom: 8px;">没有找到结果</div>
          <div style="font-size: 14px;">尝试搜索其他内容</div>
        </div>
      `;
      return;
    }

    // 如果是用户标签，显示用户卡片
    if (currentSearchResultTab === 'users') {
      container.innerHTML = results
        .map(
          user => `
        <div style="
          padding: 16px;
          border-bottom: 1px solid #2f3336;
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          transition: background-color 0.2s;
        " onmouseover="this.style.backgroundColor='rgba(255,255,255,0.03)'"
          onmouseout="this.style.backgroundColor='transparent'">
          <img src="${user.avatar}" alt="${user.name}" style="
            width: 48px;
            height: 48px;
            border-radius: 50%;
            flex-shrink: 0;
          ">
          <div style="flex: 1; min-width: 0;">
            <div style="display: flex; align-items: center; gap: 4px; margin-bottom: 2px;">
              <span style="color: #fff; font-weight: 700; font-size: 15px;">${user.name}</span>
              ${
                user.verified
                  ? `<svg viewBox="0 0 24 24" style="width: 18px; height: 18px; fill: #1d9bf0;">
                       <g><path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z"></path></g>
                     </svg>`
                  : ''
              }
            </div>
            <div style="color: #71767b; font-size: 15px; margin-bottom: 4px;">@${user.handle}</div>
            ${user.bio ? `<div style="color: #e7e9ea; font-size: 14px;">${user.bio}</div>` : ''}
          </div>
        </div>
      `,
        )
        .join('');
    } else {
      // 渲染推文列表（热门/最新）
      container.innerHTML = '';
      results.forEach(tweet => {
        container.appendChild(createTweetElement(tweet));
      });
    }
  }

  // 执行搜索（第六个情景：搜索生成器）
  async function performSearch() {
    const input = document.getElementById('search-input');
    const query = input?.value?.trim();

    if (!query) {
      showXToast('请输入搜索内容', 'info');
      return;
    }

    currentSearchQuery = query;

    // 显示搜索结果视图，隐藏热搜视图
    document.getElementById('trending-view').style.display = 'none';
    document.getElementById('search-results-view').style.display = 'flex';

    // 显示返回按钮，隐藏刷新按钮
    const backBtn = document.getElementById('search-back-btn');
    if (backBtn) backBtn.style.display = 'flex';

    const refreshBtn = document.querySelector('.refresh-trends-btn');
    if (refreshBtn) refreshBtn.style.display = 'none';

    // 显示加载状态
    const container = document.getElementById('search-results-content');
    container.innerHTML = `
      <div style="
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 60px 20px;
        color: #71767b;
      ">
        <div style="
          width: 40px;
          height: 40px;
          border: 3px solid #1d9bf0;
          border-top-color: transparent;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        "></div>
        <div style="margin-top: 20px; font-size: 15px;">正在搜索"${query}"...</div>
      </div>
    `;

    try {
      // 1. 读取API配置和X设置
      const db = getDB();
      const xDb = getXDB();

      const apiConfig = await db.apiConfig.get('main');
      if (!apiConfig || !apiConfig.proxyUrl || !apiConfig.apiKey || !apiConfig.model) {
        showXToast('请先配置API设置', 'error');
        return;
      }

      const { proxyUrl, apiKey, model } = apiConfig;

      // 2. 从X设置中读取配置
      const settingsId = `xSettings_${currentAccountId || 'main'}`;
      const xSettings = await xDb.xSettings.get(settingsId);
      const userPrompt = xSettings?.systemPrompt || '';
      const worldSetting = xSettings?.worldSetting || '';
      const boundCharacters = xSettings?.boundCharacters || [];

      // 3. 构建用户X个人资料信息
      const userXProfileInfo = StringBuilders.buildUserXProfileInfo(window.userProfileData);

      // 4. 读取绑定角色的X资料
      const allXProfiles = await xDb.xCharacterProfiles.toArray();
      const characterXProfiles = [];

      for (const charId of boundCharacters) {
        const xProfile = allXProfiles.find(p => p.characterId === charId);
        if (xProfile) {
          characterXProfiles.push(xProfile);
        }
      }

      // 5. 检查用户是否为公众人物（高曝光率身份）
      const userPublicIdentity = userXProfileInfo.publicIdentity || '';
      const userBio = userXProfileInfo.bio || '';
      const isUserPublicFigure =
        /明星|网红|博主|演员|歌手|艺人|主播|up主|偶像|导演|制片|编剧|作家|influencer|celebrity|singer|actor|artist|streamer|idol/i.test(
          userPublicIdentity + ' ' + userBio,
        );

      // 6. 检查角色隐私设置和公众身份
      const allowedCharacters = [];
      const queryLower = query.toLowerCase();

      for (const xProfile of characterXProfiles) {
        let allowInSearch = false;

        // 检查角色是否为公众人物
        const charPublicIdentity = xProfile.publicIdentity || '';
        const isCharPublicFigure =
          /明星|网红|博主|演员|歌手|艺人|主播|up主|偶像|导演|制片|编剧|作家|influencer|celebrity|singer|actor|artist|streamer|idol/i.test(
            charPublicIdentity,
          );

        // 判断是否允许在搜索结果中出现
        if (isCharPublicFigure) {
          // 公众人物：检查搜索关键词是否与角色相关
          const charName = xProfile.xName || '';
          const charHandle = xProfile.xHandle || '';
          const charBio = xProfile.xBio || '';

          if (
            charName.toLowerCase().includes(queryLower) ||
            queryLower.includes(charName.toLowerCase()) ||
            charHandle.toLowerCase().includes(queryLower) ||
            queryLower.includes(charHandle.toLowerCase()) ||
            charPublicIdentity.toLowerCase().includes(queryLower) ||
            queryLower.includes(charPublicIdentity.toLowerCase()) ||
            (charBio && (charBio.toLowerCase().includes(queryLower) || queryLower.includes(charBio.toLowerCase())))
          ) {
            allowInSearch = true;
          }
        }

        // 检查真名搜索：只有公开真名的角色才能通过真名搜索到
        if (xProfile.showRealName && xProfile.realName) {
          const realNameLower = xProfile.realName.toLowerCase();
          if (realNameLower.includes(queryLower) || queryLower.includes(realNameLower)) {
            allowInSearch = true;
          }
        }

        if (allowInSearch) {
          allowedCharacters.push({
            characterId: xProfile.characterId,
            xProfile: xProfile,
          });
        }
      }

      console.log('🔍 搜索隐私检查:', {
        query,
        isUserPublicFigure,
        totalCharacters: boundCharacters.length,
        allowedCharacters: allowedCharacters.length,
        allowedList: allowedCharacters.map(c => c.xProfile.xName),
      });

      // 7. 构建基础系统提示词
      let systemPrompt = StringBuilders.buildBaseSystemPrompt({
        userPrompt,
        worldSetting,
      });

      // 8. 添加搜索任务说明
      systemPrompt += `

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 核心任务说明 🎯
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
你是X社交平台的搜索结果生成器。用户搜索了关键词："${query}"

这是全局搜索，需要生成符合搜索关键词的X平台内容。

请生成与搜索关键词相关的结果：
- 热门：3-8条与关键词高度相关的热门推文
- 最新：3-5条与关键词相关的最新推文  
- 用户：2-6个与关键词相关的X用户账号

【重要隐私规则】：
${
  allowedCharacters.length === 0 && !isUserPublicFigure
    ? `- **禁止出现绑定用户/角色**：用户和角色都不是公众人物，且搜索关键词与他们无关
- 生成的所有内容必须是虚构的陌生用户，不能使用任何绑定角色的信息
- 这是全局搜索，应该展示与关键词相关的公众内容，而非私人关系`
    : ''
}
${
  isUserPublicFigure && queryLower.includes(userXProfileInfo.name.toLowerCase())
    ? `- **用户是公众人物且搜索了用户相关关键词**：可以生成少量与用户相关的内容（1-2条）`
    : ''
}
${
  allowedCharacters.length > 0
    ? `- **允许出现以下公众人物角色**（仅限这些）：${allowedCharacters.map(c => c.xProfile.xName).join('、')}
- 原因：这些角色是公众人物且搜索关键词与他们相关，或搜索了他们公开的真名
- 其他未列出的角色严禁出现`
    : `- **禁止出现任何绑定角色**：没有角色符合出现条件（非公众人物或搜索关键词不相关）`
}

【生成要求】：
- 所有内容必须与搜索关键词"${query}"高度相关
- 热门推文应该有较高的互动数据（点赞、转发、评论）
- 最新推文时间较近（几分钟到几小时前）
- 推文内容要多样化，从不同角度体现搜索关键词
- 每条推文2-5条评论即可
- 用户账号要有相关性（用户名、简介、或身份与关键词相关）
- 普通用户头像统一：https://i.postimg.cc/4xmx7V4R/mmexport1759081128356.jpg
- 这是全局搜索，应展示多样化的陌生用户内容，而非私人社交圈
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;

      // 9. 如果有允许出现的角色，添加角色资料
      if (allowedCharacters.length > 0) {
        systemPrompt += `

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 允许出现的公众人物信息
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
以下是符合搜索条件、可以在结果中出现的公众人物：

`;
        for (const { xProfile } of allowedCharacters) {
          systemPrompt += `
【${xProfile.xName}】
- X姓名：${xProfile.xName}
- X句柄：@${xProfile.xHandle}
- X头像：${xProfile.xAvatar}
- 认证状态：${xProfile.xVerified ? '已认证' : '未认证'}
- 公众身份：${xProfile.publicIdentity || '未设置'}
${xProfile.xBio ? `- X简介：${xProfile.xBio}` : ''}
${xProfile.showRealName && xProfile.realName ? `- 真实姓名：${xProfile.realName}（已公开）` : ''}

`;
        }

        systemPrompt += `
【使用规则】：
- 只能使用上述列出的公众人物信息
- 必须严格使用其X姓名、句柄、头像、认证状态
- 如果他们与搜索关键词相关，可以作为推文发布者或出现在用户列表中
- 其他未列出的角色严禁出现
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;
      }

      // 10. 用户资料
      systemPrompt += StringBuilders.buildUniversalConstraints(userXProfileInfo);

      // 11. 添加格式要求
      systemPrompt += `

【JSON返回格式】：
\`\`\`json
{
  "top": [热门推文数组(3-5条)],
  "latest": [最新推文数组(3-5条)],
  "users": [用户数组(2-4个)]
}
\`\`\`

推文对象结构：
- user: {name, handle, avatar, verified}
- content: 推文文本（必须与"${query}"相关）
- time: 时间描述
- stats: {comments, retweets, likes, views} (纯数字)
- media: [{type:"description", description:"描述", sensitive:false}] (可选，30-50%推文包含)
- comments: [评论数组(2-4条)]

用户对象结构：
- name: 用户姓名
- handle: 用户句柄（不带@）
- avatar: 头像URL
- verified: 布尔值
- bio: 个人简介（体现与"${query}"的关联）

关键规则：
1. 所有内容必须围绕搜索关键词"${query}"展开
2. 热门推文stats高（1万-50万），最新推文stats低（100-5千）
3. 最新推文时间近（刚刚、几分钟前、1小时前等）
4. verified字段必须是布尔值(true/false)
5. stats中所有数字必须是纯数字${worldSetting.trim() ? '\n6. 严格遵守世界观设定' : ''}
`;

      const messages = [{ role: 'user', content: `请生成关键词"${query}"的搜索结果` }];

      // 12. 发送API请求
      let isGemini = proxyUrl.includes('generativelanguage');
      let response;

      if (isGemini) {
        const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models';
        const apiKeyValue = typeof getRandomValue === 'function' ? getRandomValue(apiKey) : apiKey;
        const geminiConfig = {
          url: `${GEMINI_API_URL}/${model}:generateContent?key=${apiKeyValue}`,
          data: {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: systemPrompt + '\n\n' + messages.map(m => m.content).join('\n'),
                    },
                  ],
                },
              ],
              generationConfig: {
                temperature: 0.8,
              },
            }),
          },
        };
        response = await fetch(geminiConfig.url, geminiConfig.data);
      } else {
        const openAiPayload = {
          model: model,
          messages: [{ role: 'system', content: systemPrompt }, ...messages],
          temperature: 0.8,
          stream: false,
        };
        response = await fetch(`${proxyUrl}/v1/chat/completions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify(openAiPayload),
        });
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API错误: ${response.status} - ${errorData.error?.message || response.statusText}`);
      }

      const data = await response.json();
      let aiResponseContent;

      if (isGemini) {
        if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) {
          aiResponseContent = data.candidates[0].content.parts[0].text || '';
        }
      } else {
        aiResponseContent = data.choices?.[0]?.message?.content || '';
      }

      console.log('🔍 AI搜索响应:', aiResponseContent);

      // 13. 解析JSON响应
      const cleanedResponse = aiResponseContent
        .replace(/```json\s*/i, '')
        .replace(/```\s*$/, '')
        .trim();

      if (!cleanedResponse) {
        throw new Error('AI返回了空的响应内容');
      }

      let searchResults;
      try {
        searchResults = JSON.parse(cleanedResponse);
      } catch (parseError) {
        console.error('JSON解析失败:', parseError);
        console.error('尝试解析的内容:', cleanedResponse.substring(0, 500) + '...');
        throw new Error(`AI返回的数据不是有效的JSON格式: ${parseError.message}`);
      }

      // 14. 验证数据格式
      if (!searchResults.top || !searchResults.latest || !searchResults.users) {
        throw new Error('AI返回的数据格式不正确，缺少必要字段');
      }

      // 15. 为推文添加唯一ID
      const timestamp = Date.now();

      searchResults.top = searchResults.top.map((tweet, index) => ({
        ...tweet,
        id: `search_top_${timestamp}_${index}`,
        comments:
          tweet.comments?.map((comment, cIndex) => ({
            ...comment,
            id: `search_top_${timestamp}_${index}_c${cIndex}`,
          })) || [],
      }));

      searchResults.latest = searchResults.latest.map((tweet, index) => ({
        ...tweet,
        id: `search_latest_${timestamp}_${index}`,
        comments:
          tweet.comments?.map((comment, cIndex) => ({
            ...comment,
            id: `search_latest_${timestamp}_${index}_c${cIndex}`,
          })) || [],
      }));

      // 16. 更新搜索结果数据
      searchResultsData.top = searchResults.top;
      searchResultsData.latest = searchResults.latest;
      searchResultsData.users = searchResults.users;

      // 17. 保存到数据库
      try {
        await xDb.xTweetsData.put({
          id: `search_${query}`,
          query: query,
          results: searchResults,
          timestamp: new Date().toISOString(),
        });
        console.log('✅ 搜索结果已保存到数据库');
      } catch (saveError) {
        console.error('⚠️ 保存搜索结果失败:', saveError);
      }

      // 18. 渲染搜索结果
      renderSearchResults();

      showXToast(`找到 ${searchResults.top.length + searchResults.latest.length} 条相关推文`, 'success');
    } catch (error) {
      console.error('❌ 搜索失败:', error);
      showXToast(`搜索失败: ${error.message}`, 'error');

      // 显示错误状态
      const container = document.getElementById('search-results-content');
      container.innerHTML = `
        <div style="
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 20px;
          color: #f4212e;
        ">
          <svg viewBox="0 0 24 24" style="width: 80px; height: 80px; fill: #f4212e; margin-bottom: 20px;">
            <g><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path></g>
          </svg>
          <div style="font-size: 18px; font-weight: 600; margin-bottom: 8px;">搜索出错</div>
          <div style="font-size: 14px; color: #71767b;">${error.message}</div>
        </div>
      `;
    }
  }

  // 返回热搜视图
  function backToTrending() {
    document.getElementById('search-results-view').style.display = 'none';
    document.getElementById('trending-view').style.display = 'flex';

    // 隐藏返回按钮，显示刷新按钮
    const backBtn = document.getElementById('search-back-btn');
    if (backBtn) backBtn.style.display = 'none';

    const refreshBtn = document.querySelector('.refresh-trends-btn');
    if (refreshBtn) refreshBtn.style.display = 'flex';

    // 清空搜索框
    const input = document.getElementById('search-input');
    if (input) {
      input.value = '';
      toggleSearchButton();
    }

    currentSearchQuery = '';
  }

  // 打开自定义分类管理模态框
  async function openAddCategoryModal() {
    const modal = document.getElementById('category-manager-modal');
    if (modal) {
      modal.style.display = 'flex';

      // 加载自定义分类数据
      await loadCustomCategories();

      // 渲染分类列表
      renderCustomCategoriesList();
    }
  }

  // 关闭分类管理模态框
  function closeCategoryModal(event) {
    if (event && event.target !== event.currentTarget) return;

    const modal = document.getElementById('category-manager-modal');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  // 加载自定义分类
  async function loadCustomCategories() {
    try {
      const xDb = getXDB();
      const accountId = currentAccountId || 'main';
      const settingsId = `customCategories_${accountId}`;

      const savedData = await xDb.xTweetsData.get(settingsId);
      if (savedData && savedData.categories) {
        customCategories = savedData.categories;
        console.log('✅ 已加载自定义分类:', customCategories.length, '个');
      } else {
        customCategories = [];
      }
    } catch (error) {
      console.error('⚠️ 加载自定义分类失败:', error);
      customCategories = [];
    }
  }

  // 保存自定义分类
  async function saveCustomCategories() {
    try {
      const xDb = getXDB();
      const accountId = currentAccountId || 'main';
      const settingsId = `customCategories_${accountId}`;

      await xDb.xTweetsData.put({
        id: settingsId,
        categories: customCategories,
        lastUpdated: new Date().toISOString(),
      });

      console.log('✅ 自定义分类已保存');
      showXToast('分类设置已保存', 'success');

      // 更新标签栏显示
      updateSearchTabs();

      // 关闭模态框
      closeCategoryModal();
    } catch (error) {
      console.error('❌ 保存自定义分类失败:', error);
      showXToast('保存失败: ' + error.message, 'error');
    }
  }

  // 渲染自定义分类列表
  function renderCustomCategoriesList() {
    const container = document.getElementById('custom-categories-list');
    if (!container) return;

    if (customCategories.length === 0) {
      container.innerHTML = `
        <div style="
          text-align: center;
          padding: 40px 20px;
          color: #71767b;
          font-size: 14px;
        ">
          还没有自定义分类，点击"添加分类"按钮创建
        </div>
      `;
      return;
    }

    container.innerHTML = customCategories
      .map(
        (category, index) => `
      <div style="
        background-color: #1a1a1a;
        border: 1px solid #333;
        border-radius: 8px;
        padding: 16px;
      ">
        <div style="display: flex; align-items: flex-start; gap: 12px;">
          <!-- 启用开关 -->
          <label style="
            display: flex;
            align-items: center;
            cursor: pointer;
            margin-top: 4px;
          ">
            <input 
              type="checkbox" 
              ${category.enabled ? 'checked' : ''} 
              onchange="toggleCategory(${index})"
              style="
                width: 18px;
                height: 18px;
                accent-color: #1d9bf0;
                cursor: pointer;
              ">
          </label>

          <!-- 分类内容 -->
          <div style="flex: 1; min-width: 0;">
            <!-- 分类名称 -->
            <div style="margin-bottom: 12px;">
              <label style="
                display: block;
                color: #8b98a5;
                font-size: 13px;
                margin-bottom: 4px;
              ">分类名称 *</label>
              <input 
                type="text" 
                value="${category.name || ''}" 
                placeholder="例如：动漫"
                onchange="updateCategoryName(${index}, this.value)"
                style="
                  width: 100%;
                  background-color: #000;
                  border: 1px solid #333;
                  border-radius: 4px;
                  color: #fff;
                  padding: 8px 12px;
                  font-size: 15px;
                  outline: none;
                " 
                onfocus="this.style.borderColor='#1d9bf0'" 
                onblur="this.style.borderColor='#333'">
            </div>

            <!-- 分类描述 -->
            <div style="margin-bottom: 12px;">
              <label style="
                display: block;
                color: #8b98a5;
                font-size: 13px;
                margin-bottom: 4px;
              ">分类内容/类型（可选）</label>
              <textarea 
                placeholder="例如：动画、漫画、声优、番剧相关内容"
                onchange="updateCategoryDescription(${index}, this.value)"
                style="
                  width: 100%;
                  min-height: 60px;
                  background-color: #000;
                  border: 1px solid #333;
                  border-radius: 4px;
                  color: #fff;
                  padding: 8px 12px;
                  font-size: 14px;
                  resize: vertical;
                  outline: none;
                  font-family: inherit;
                " 
                onfocus="this.style.borderColor='#1d9bf0'" 
                onblur="this.style.borderColor='#333'">${category.description || ''}</textarea>
            </div>

            <!-- 状态提示 -->
            <div style="
              display: flex;
              align-items: center;
              justify-content: space-between;
              color: ${category.enabled ? '#1d9bf0' : '#71767b'};
              font-size: 12px;
            ">
              <span>${category.enabled ? '✅ 已启用' : '❌ 已禁用'}</span>
              <button 
                onclick="deleteCategory(${index})"
                style="
                  background: transparent;
                  color: #f4212e;
                  border: 1px solid #f4212e;
                  border-radius: 16px;
                  padding: 4px 12px;
                  font-size: 12px;
                  cursor: pointer;
                  transition: all 0.2s;
                "
                onmouseover="this.style.backgroundColor='rgba(244,33,46,0.1)'"
                onmouseout="this.style.backgroundColor='transparent'">
                删除
              </button>
            </div>
          </div>
        </div>
      </div>
    `,
      )
      .join('');
  }

  // 添加新分类
  function addNewCategory() {
    customCategories.push({
      id: `custom_${Date.now()}`,
      name: '',
      description: '',
      enabled: true,
    });

    renderCustomCategoriesList();
  }

  // 删除分类
  function deleteCategory(index) {
    if (confirm('确定要删除这个分类吗？')) {
      customCategories.splice(index, 1);
      renderCustomCategoriesList();
    }
  }

  // 切换分类启用状态
  function toggleCategory(index) {
    if (customCategories[index]) {
      customCategories[index].enabled = !customCategories[index].enabled;
      renderCustomCategoriesList();
    }
  }

  // 更新分类名称
  function updateCategoryName(index, name) {
    if (customCategories[index]) {
      customCategories[index].name = name.trim();
    }
  }

  // 更新分类描述
  function updateCategoryDescription(index, description) {
    if (customCategories[index]) {
      customCategories[index].description = description.trim();
    }
  }

  // 更新搜索标签栏
  function updateSearchTabs() {
    const tabsContainer = document.querySelector('.search-tabs');
    if (!tabsContainer) return;

    // 清空现有标签（保留+号按钮）
    const addBtn = tabsContainer.querySelector('.add-category-btn');
    tabsContainer.innerHTML = '';

    // 添加默认标签
    const recommendedTab = document.createElement('div');
    recommendedTab.className = 'search-tab' + (currentSearchTab === 'recommended' ? ' active' : '');
    recommendedTab.textContent = '为你推荐';
    recommendedTab.onclick = () => switchSearchTab('recommended');
    tabsContainer.appendChild(recommendedTab);

    const trendingTab = document.createElement('div');
    trendingTab.className = 'search-tab' + (currentSearchTab === 'trending' ? ' active' : '');
    trendingTab.textContent = '当前趋势';
    trendingTab.onclick = () => switchSearchTab('trending');
    tabsContainer.appendChild(trendingTab);

    // 添加启用的自定义分类标签
    customCategories
      .filter(cat => cat.enabled && cat.name)
      .forEach(category => {
        const customTab = document.createElement('div');
        customTab.className = 'search-tab' + (currentSearchTab === category.id ? ' active' : '');
        customTab.textContent = category.name;
        customTab.onclick = () => switchSearchTab(category.id);
        tabsContainer.appendChild(customTab);
      });

    // 重新添加+号按钮
    if (addBtn) {
      tabsContainer.appendChild(addBtn);
    }
  }

  // 初始化搜索页面
  async function initSearchPage() {
    // 加载自定义分类
    await loadCustomCategories();

    // 更新标签栏
    updateSearchTabs();

    // 确保显示热搜视图，隐藏搜索结果视图
    document.getElementById('trending-view').style.display = 'flex';
    document.getElementById('search-results-view').style.display = 'none';

    // 显示刷新按钮，隐藏返回按钮
    const refreshBtn = document.querySelector('.refresh-trends-btn');
    if (refreshBtn) refreshBtn.style.display = 'flex';

    const backBtn = document.getElementById('search-back-btn');
    if (backBtn) backBtn.style.display = 'none';

    // 尝试从数据库加载热搜数据
    try {
      const xDb = getXDB();
      const savedTrends = await xDb.xTweetsData.get('trends');

      if (savedTrends) {
        // 加载默认分类数据
        if (savedTrends.recommended && savedTrends.trending) {
          trendingData.recommended = savedTrends.recommended;
          trendingData.trending = savedTrends.trending;
        }

        // 加载自定义分类数据
        customCategories.forEach(category => {
          if (savedTrends[category.id]) {
            trendingData[category.id] = savedTrends[category.id];
          }
        });

        console.log('✅ 已从数据库加载热搜数据');
      }
    } catch (error) {
      console.log('⚠️ 加载热搜数据失败，使用默认数据:', error);
    }

    // 渲染热搜列表
    renderTrendingList();
  }

  // ▼▼▼ ！！！三个情景综合如下！！！▼▼▼
  // "为你推荐"页面的测试推文数据（示范用）
  const forYouTweets = [
    {
      id: '1',
      user: {
        name: '热门推荐用户',
        handle: '@trending_user',
        avatar: 'https://i.postimg.cc/4xmx7V4R/mmexport1759081128356.jpg',
        verified: true,
      },
      content: '🔥 今日热门话题！大家都在讨论的新技术趋势 #AI #科技 #未来',
      time: '3小时',
      media: [],
      stats: {
        comments: 567,
        retweets: 1200,
        likes: 5600,
        views: 89000,
      },
      comments: [
        {
          id: 'c1-1',
          user: {
            name: '科技达人',
            handle: '@tech_expert',
            avatar: 'https://i.postimg.cc/4xmx7V4R/mmexport1759081128356.jpg',
            verified: true,
          },
          content: '确实，AI技术发展太快了，每天都有新突破',
          time: '2小时',
          replies: [
            {
              id: 'c1-1-1',
              user: {
                name: '学生小王',
                handle: '@student_wang',
                avatar: 'https://i.postimg.cc/4xmx7V4R/mmexport1759081128356.jpg',
                verified: false,
              },
              content: '请问有什么推荐的学习资源吗？',
              time: '1小时',
              replyTo: '@tech_expert',
            },
          ],
        },
      ],
    },
  ];

  // "正在关注"页面的测试推文数据（示范用）
  const followingTweets = [
    {
      id: '2',
      user: {
        name: '我的朋友',
        handle: '@my_friend',
        avatar: 'https://i.postimg.cc/4xmx7V4R/mmexport1759081128356.jpg',
        verified: false,
      },
      content: '今天天气真不错，和朋友们一起出去玩了！😊 #美好时光',
      time: '30分钟',
      media: [
        {
          type: 'image',
          description: '阳光明媚的公园里，几个朋友在草地上野餐的温馨场景',
          sensitive: false,
        },
      ],
      stats: {
        comments: 8,
        retweets: 2,
        likes: 24,
        views: 156,
      },
      comments: [
        {
          id: 'c2-1',
          user: {
            name: '好友A',
            handle: '@friend_a',
            avatar: 'https://i.postimg.cc/4xmx7V4R/mmexport1759081128356.jpg',
            verified: false,
          },
          content: '看起来很棒！下次叫上我 😊',
          time: '25分钟',
          replies: [],
        },
      ],
    },
    {
      id: '3',
      user: {
        name: '数码达人',
        handle: '@digital_expert',
        avatar: 'https://i.postimg.cc/4xmx7V4R/mmexport1759081128356.jpg',
        verified: true,
      },
      content: '完全同意这个观点！AI确实正在改变我们的生活方式，每个人都应该学会拥抱这种变化 🤖✨',
      time: '45分钟',
      media: [],
      quotedTweet: {
        type: 'tweet',
        user: {
          name: '科技前沿',
          handle: '@tech_frontier',
          avatar: 'https://i.postimg.cc/4xmx7V4R/mmexport1759081128356.jpg',
          verified: true,
        },
        content: 'AI技术的快速发展正在重塑各行各业，从自动驾驶到智能助手，我们正生活在一个科技革命的时代 #AI #未来科技',
        time: '2小时',
      },
      stats: {
        comments: 15,
        retweets: 32,
        likes: 89,
        views: 1250,
      },
      comments: [
        {
          id: 'c3-1',
          user: {
            name: '科技爱好者',
            handle: '@tech_lover',
            avatar: 'https://i.postimg.cc/4xmx7V4R/mmexport1759081128356.jpg',
            verified: false,
          },
          content: '是的，特别是在工作效率提升方面，AI工具帮助很大',
          time: '40分钟',
          replies: [],
        },
      ],
    },
  ];

  // 格式化数字显示
  function formatNumber(num) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + '万';
    } else if (num >= 10000) {
      return (num / 10000).toFixed(1) + '万';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  }

  // 处理推文内容，为话题标签和提及添加高亮
  function processContent(content) {
    if (!content) return '';

    // 处理话题标签 (#hashtag)
    content = content.replace(/#([^\s#@]+)/g, '<span class="hashtag">#$1</span>');

    // 处理提及 (@mention)
    content = content.replace(/@([^\s#@]+)/g, '<span class="mention">@$1</span>');

    return content;
  }

  // 清理评论内容中的重复回复文本
  function cleanReplyContent(content, replyTo) {
    if (!content) return '';

    // 如果有replyTo，移除评论内容开头的"回复@xxx:"格式
    if (replyTo) {
      // 移除开头的"回复@用户名:"或"回复 @用户名:"
      content = content.replace(/^回复\s*@[^\s:：]+[：:]\s*/, '');
      // 移除开头直接的"@用户名"格式（如果跟replyTo重复）
      const replyHandle = replyTo.replace('@', '');
      content = content.replace(new RegExp(`^@${replyHandle}\\s*[：:]?\\s*`, 'i'), '');
      // 移除内容中任何与replyTo重复的@提及
      content = content.replace(new RegExp(`@${replyHandle}(?=\\s|$|[^\\w])`, 'gi'), '');
    }

    return content;
  }

  // 创建推文元素
  function createTweetElement(tweet) {
    const tweetEl = document.createElement('div');
    tweetEl.className = 'tweet-item';
    tweetEl.dataset.tweetId = tweet.id;

    tweetEl.innerHTML = `
              <img class="tweet-avatar" src="${tweet.user.avatar}" alt="${tweet.user.name}">
              <div class="tweet-main">
                <div class="tweet-user-info">
                  <span class="tweet-user-name">${tweet.user.name}</span>
                  ${
                    tweet.user.verified
                      ? '<svg class="tweet-verified" viewBox="0 0 24 24"><g><path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.27 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.46 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z"></path></g></svg>'
                      : ''
                  }
                  <span class="tweet-user-handle">${tweet.user.handle}</span>
                  <span class="tweet-time">·${tweet.time}</span>
                  <div class="tweet-more">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <g><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></g>
                    </svg>
                  </div>
                </div>
                ${tweet.content ? `<div class="tweet-content">${processContent(tweet.content)}</div>` : ''}
                ${
                  tweet.quotedTweet
                    ? `
                  <div class="quoted-tweet" onclick="handleQuotedTweetClick('${tweet.quotedTweet.user.handle}')">
                    <div class="quote-indicator">
                      <svg viewBox="0 0 24 24">
                        <g><path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.791-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.791 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"></path></g>
                      </svg>
                      ${tweet.quotedTweet.type === 'comment' ? '引用评论' : '引用推文'}
                    </div>
                    <div class="quoted-user-info">
                      <img class="quoted-user-avatar" src="${tweet.quotedTweet.user.avatar}" alt="${
                        tweet.quotedTweet.user.name
                      }">
                      <span class="quoted-user-name">${tweet.quotedTweet.user.name}</span>
                      ${
                        tweet.quotedTweet.user.verified
                          ? '<svg class="tweet-verified" style="width: 14px; height: 14px;" viewBox="0 0 24 24"><g><path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.27 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.46 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z"></path></g></svg>'
                          : ''
                      }
                      <span class="quoted-user-handle">${tweet.quotedTweet.user.handle}</span>
                      <span class="quoted-user-time">·${tweet.quotedTweet.time}</span>
                    </div>
                    <div class="quoted-content">${processContent(tweet.quotedTweet.content)}</div>
                    ${
                      tweet.quotedTweet.image
                        ? `
                      <div class="quoted-media" style="margin-top: 8px;">
                        ${
                          tweet.quotedTweet.image.type === 'description'
                            ? `
                          <div style="background-color: rgba(255,255,255,0.05); border: 1px solid #333; border-radius: 8px; padding: 8px;">
                            <div style="color: #fff; font-size: 12px; line-height: 1.4;">${tweet.quotedTweet.image.content}</div>
                          </div>
                        `
                            : ''
                        }
                        ${
                          tweet.quotedTweet.image.type === 'upload'
                            ? `
                          <div style="border-radius: 8px; overflow: hidden;">
                            <img src="${tweet.quotedTweet.image.content}" style="width: 100%; max-height: 100px; object-fit: cover; display: block;" alt="引用图片">
                          </div>
                        `
                            : ''
                        }
                      </div>
                    `
                        : ''
                    }
                  </div>
                `
                    : ''
                }
                ${
                  tweet.media && tweet.media.length > 0
                    ? `
                  <div class="tweet-media">
                    <div style="width: 100%; height: 200px; background-color: #333; border-radius: 16px; display: flex; align-items: center; justify-content: center; color: #71767b; position: relative;" id="media-${
                      tweet.id
                    }">
                      ${
                        tweet.media[0].sensitive
                          ? `
                        <div class="sensitive-overlay" onclick="showSensitiveContent('${tweet.id}')">
                          <div class="sensitive-text">敏感内容</div>
                          <div class="sensitive-description">此推文可能包含敏感内容</div>
                        </div>
                      `
                          : ''
                      }
                      <div style="text-align: center; padding: 20px; ${
                        tweet.media[0].sensitive ? 'filter: blur(20px);' : ''
                      }" id="content-${tweet.id}">
                        <div style="font-size: 14px;">${tweet.media[0].description}</div>
                      </div>
                    </div>
                  </div>
                `
                    : ''
                }
                <div class="tweet-actions">
                  <div class="tweet-action comment" onclick="showTweetComments('${tweet.id}')">
                    <svg class="action-icon" viewBox="0 0 24 24" fill="currentColor">
                      <g><path d="M1.751 10c0-4.42 3.584-8.005 8.005-8.005h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.005zm8.005-6.005c-3.317 0-6.005 2.69-6.005 6.005 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"></path></g>
                    </svg>
                    <span>${formatNumber(tweet.stats.comments)}</span>
                  </div>
                  <div class="tweet-action retweet" onclick="handleQuoteRetweetFromData('tweet', '${tweet.id}')">
                    <svg class="action-icon" viewBox="0 0 24 24" fill="currentColor">
                      <g><path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.791-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.791 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"></path></g>
                    </svg>
                    <span>${DataUtils.formatNumber(tweet.stats.retweets)}</span>
                  </div>
                  <div class="tweet-action like" onclick="toggleLike('${
                    tweet.id
                  }', this)" data-liked="false" data-likes="${tweet.stats.likes}">
                    <svg class="action-icon like-icon" viewBox="0 0 24 24" fill="currentColor">
                      <g><path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path></g>
                    </svg>
                    <span class="like-count">${DataUtils.formatNumber(tweet.stats.likes)}</span>
                  </div>
                  <div class="tweet-action view">
                    <svg class="action-icon" viewBox="0 0 24 24" fill="currentColor">
                      <g><path d="M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10H6v10H4zm9.248 0v-7h2v7h-2z"></path></g>
                    </svg>
                    <span>${DataUtils.formatNumber(tweet.stats.views)}</span>
                  </div>
                  <div class="tweet-action bookmark">
                    <svg class="action-icon" viewBox="0 0 24 24" fill="currentColor">
                      <g><path d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5zM6.5 4c-.276 0-.5.22-.5.5v14.56l6-4.29 6 4.29V4.5c0-.28-.224-.5-.5-.5h-11z"></path></g>
                    </svg>
                  </div>
                  <div class="tweet-action share">
                    <svg class="action-icon" viewBox="0 0 24 24" fill="currentColor">
                      <g><path d="M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.29 3.3-1.42-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z"></path></g>
                    </svg>
                  </div>
                </div>
              </div>
            `;

    return tweetEl;
  }

  // 处理引用推文点击
  function handleQuotedTweetClick(userHandle) {
    showXToast(`点击了引用的 ${userHandle} 的内容`, 'info');
  }

  // 渲染推文到容器
  function renderTweets(tweets, containerId) {
    const container = document.querySelector(`#${containerId} .tweets-container`);
    container.innerHTML = '';

    tweets.forEach(tweet => {
      const tweetElement = createTweetElement(tweet);
      container.appendChild(tweetElement);

      // 为推文作者头像添加点击事件
      const avatar = tweetElement.querySelector('.tweet-avatar');
      if (avatar) {
        avatar.style.cursor = 'pointer';
        avatar.addEventListener('click', e => {
          e.stopPropagation();
          openAccountProfile(tweet.user.name, tweet.user.handle, tweet.user.avatar);
        });
      }

      // 为引用推文中的头像添加点击事件
      const quotedAvatar = tweetElement.querySelector('.quoted-user-avatar');
      if (quotedAvatar && tweet.quotedTweet) {
        quotedAvatar.style.cursor = 'pointer';
        quotedAvatar.addEventListener('click', e => {
          e.stopPropagation();
          openAccountProfile(tweet.quotedTweet.user.name, tweet.quotedTweet.user.handle, tweet.quotedTweet.user.avatar);
        });
      }
    });
  }

  // 初始化推文数据
  async function initializeTweets() {
    try {
      // 尝试从数据库加载保存的推文数据
      const db = getXDB();

      const savedData = await db.xTweetsData.get('tweets');

      if (savedData && savedData.forYouTweets && savedData.followingTweets) {
        // 使用保存的数据
        forYouTweets.length = 0;
        followingTweets.length = 0;
        forYouTweets.push(...savedData.forYouTweets);
        followingTweets.push(...savedData.followingTweets);

        console.log('已加载保存的推文数据，最后更新时间:', savedData.lastUpdated);
      }
    } catch (error) {
      console.error('加载推文数据失败，使用默认数据:', error);
    }

    // 渲染推文
    renderTweets(forYouTweets, 'for-you-content');
    renderTweets(followingTweets, 'following-content');
  }

  // 显示敏感内容
  function showSensitiveContent(tweetId) {
    const overlay = document.querySelector(`#media-${tweetId} .sensitive-overlay`);
    const content = document.getElementById(`content-${tweetId}`);

    if (overlay) {
      overlay.style.display = 'none';
    }
    if (content) {
      content.style.filter = 'none';
    }
  }

  // 点赞功能
  function toggleLike(tweetId, element) {
    const isLiked = element.dataset.liked === 'true';
    const currentLikes = parseInt(element.dataset.likes);
    const likeIcon = element.querySelector('.like-icon');
    const likeCount = element.querySelector('.like-count');

    if (isLiked) {
      // 取消点赞
      element.dataset.liked = 'false';
      element.dataset.likes = (currentLikes - 1).toString();
      element.classList.remove('liked');
      likeCount.textContent = DataUtils.formatNumber(currentLikes - 1);
    } else {
      // 点赞
      element.dataset.liked = 'true';
      element.dataset.likes = (currentLikes + 1).toString();
      element.classList.add('liked');
      likeCount.textContent = DataUtils.formatNumber(currentLikes + 1);

      // 添加动画效果
      likeIcon.classList.add('like-animation');
      setTimeout(() => {
        likeIcon.classList.remove('like-animation');
      }, 600);
    }
  }

  // 生成随机点赞数
  function generateRandomLikes() {
    return Math.floor(Math.random() * 50) + 1;
  }

  // 创建评论元素
  function createCommentElement(comment, isReply = false) {
    const commentEl = document.createElement('div');
    commentEl.className = isReply ? 'comment-item reply-item' : 'comment-item';
    commentEl.dataset.commentId = comment.id;

    const randomLikes = generateRandomLikes();
    const randomComments = Math.floor(Math.random() * 10) + 1;
    const randomRetweets = Math.floor(Math.random() * 5) + 1;
    const randomViews = Math.floor(Math.random() * 1000) + 50;

    commentEl.innerHTML = `
              <img class="tweet-avatar" src="${comment.user.avatar}" alt="${comment.user.name}">
              <div class="comment-main">
                <div class="comment-user-info">
                  <span class="tweet-user-name">${comment.user.name}</span>
                  ${
                    comment.user.verified
                      ? '<svg class="tweet-verified" viewBox="0 0 24 24"><g><path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.27 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.46 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z"></path></g></svg>'
                      : ''
                  }
                  <span class="tweet-user-handle">${comment.user.handle}</span>
                  <span class="tweet-time">·${comment.time}</span>
                  ${
                    comment.user.handle === userProfileData.handle
                      ? `
                  <div class="comment-delete-btn" onclick="deleteUserComment('${comment.id}')" style="margin-left: auto; cursor: pointer; padding: 4px; border-radius: 50%; transition: background-color 0.2s;" onmouseover="this.style.backgroundColor='rgba(239, 68, 68, 0.1)'" onmouseout="this.style.backgroundColor='transparent'" title="删除评论">
                    <svg viewBox="0 0 24 24" style="width: 16px; height: 16px; fill: #ef4444;">
                      <g><path d="M16 6V4.5C16 3.12 14.88 2 13.5 2h-3C9.11 2 8 3.12 8 4.5V6H3v2h2v10c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V8h2V6h-5zM10 4.5c0-.28.22-.5.5-.5h3c.28 0 .5.22.5.5V6h-4V4.5zM19 8H5v10h14V8z"></path></g>
                    </svg>
                  </div>
                  `
                      : ''
                  }
                </div>
                <div class="comment-content">
                  ${comment.replyTo ? `<span class="reply-to">${comment.replyTo}</span>` : ''}
                  ${processContent(cleanReplyContent(comment.content, comment.replyTo))}
                  ${
                    comment.image
                      ? comment.image.type === 'description'
                        ? `<div style="margin-top: 8px; background-color: rgba(255,255,255,0.05); border: 1px solid #333; border-radius: 8px; padding: 8px;">
                            <div style="color: #fff; font-size: 13px; line-height: 1.4;">${comment.image.content}</div>
                          </div>`
                        : `<div style="margin-top: 8px; border-radius: 12px; overflow: hidden; max-width: 300px;">
                            <img src="${comment.image.content}" style="width: 100%; max-height: 280px; object-fit: cover; display: block;" alt="评论图片">
                          </div>`
                      : ''
                  }
                </div>
                <div class="comment-actions">
                  <div class="comment-action reply-action" onclick="showReplyInput('${comment.id}', '${
      comment.user.handle
    }')">
                    <svg class="action-icon" viewBox="0 0 24 24" fill="currentColor">
                      <g><path d="M1.751 10c0-4.42 3.584-8.005 8.005-8.005h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.005zm8.005-6.005c-3.317 0-6.005 2.69-6.005 6.005 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"></path></g>
                    </svg>
                    <span>${randomComments}</span>
                  </div>
                  <div class="comment-action" onclick="handleQuoteRetweetFromData('comment', '${comment.id}')">
                    <svg class="action-icon" viewBox="0 0 24 24" fill="currentColor">
                      <g><path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.791-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.791 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"></path></g>
                    </svg>
                    <span>${randomRetweets}</span>
                  </div>
                  <div class="comment-action like" onclick="toggleCommentLike('${
                    comment.id
                  }', this)" data-liked="false" data-likes="${randomLikes}">
                    <svg class="action-icon like-icon" viewBox="0 0 24 24" fill="currentColor">
                      <g><path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path></g>
                    </svg>
                    <span class="like-count">${randomLikes}</span>
                  </div>
                  <div class="comment-action">
                    <svg class="action-icon" viewBox="0 0 24 24" fill="currentColor">
                      <g><path d="M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10H6v10H4zm9.248 0v-7h2v7h-2z"></path></g>
                    </svg>
                    <span>${formatNumber(randomViews)}</span>
                  </div>
                </div>
                <!-- 回复输入框容器 -->
                <div id="reply-input-${
                  comment.id
                }" class="reply-input-container" style="display: none; margin-top: 12px; padding-left: 48px;">
                  <div style="display: flex; align-items: flex-start; gap: 12px;">
                    <img src="https://i.postimg.cc/pXxk1JXk/IMG-6442.jpg" alt="Your avatar" style="width: 32px; height: 32px; border-radius: 50%; flex-shrink: 0;" class="reply-user-avatar">
                    <div style="flex: 1;">
                      <textarea placeholder="发布你的回复" style="width: 100%; min-height: 20px; max-height: 80px; background: transparent; border: none; color: #fff; font-size: 15px; resize: none; outline: none; font-family: inherit; line-height: 1.3; border-bottom: 1px solid #333; padding-bottom: 8px;" oninput="autoResizeReply(this, '${
                        comment.id
                      }')" onkeydown="handleReplyInput(event, '${comment.id}', '${comment.user.handle}')"></textarea>
                      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 8px;">
                        <div style="display: flex; gap: 12px;">
                          <svg viewBox="0 0 24 24" style="width: 16px; height: 16px; fill: #1d9bf0; cursor: pointer;">
                            <g><path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"></path></g>
                          </svg>
                          <svg viewBox="0 0 24 24" style="width: 16px; height: 16px; fill: #1d9bf0; cursor: pointer;">
                            <g><path d="M8 9.5C8 8.119 8.672 7 9.5 7S11 8.119 11 9.5 10.328 12 9.5 12 8 10.881 8 9.5zm6.5 2.5c.828 0 1.5-1.119 1.5-2.5S15.328 7 14.5 7 13 8.119 13 9.5s.672 2.5 1.5 2.5zM12 16c-2.224 0-3.021-2.227-3.051-2.316l-1.897.633c.05.15 1.271 3.684 4.949 3.684s4.898-3.533 4.949-3.684l-1.896-.638c-.033.095-.83 2.322-3.053 2.322zm10.25-4.001c0 5.652-4.598 10.25-10.25 10.25S1.75 17.652 1.75 12 6.348 1.75 12 1.75 22.25 6.348 22.25 12zm-2 0c0-4.549-3.701-8.25-8.25-8.25S3.75 7.451 3.75 12s3.701 8.25 8.25 8.25 8.25-3.701 8.25-8.25z"></path></g>
                          </svg>
                        </div>
                        <div style="display: flex; gap: 8px;">
                          <button onclick="cancelReply('${
                            comment.id
                          }')" style="background: transparent; color: #71767b; border: 1px solid #333; border-radius: 16px; padding: 4px 12px; font-size: 13px; cursor: pointer;">取消</button>
                          <button id="reply-btn-${comment.id}" onclick="submitReply('${comment.id}', '${
      comment.user.handle
    }')" style="background-color: #1d9bf0; color: #fff; border: none; border-radius: 16px; padding: 4px 12px; font-size: 13px; cursor: pointer; opacity: 0.5;" disabled>回复</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            `;

    return commentEl;
  }

  // 删除用户评论功能
  async function deleteUserComment(commentId) {
    if (!confirm('确定要删除这条评论吗？')) {
      return;
    }

    const commentElement = document.querySelector(`[data-comment-id="${commentId}"]`);
    if (commentElement) {
      // 添加淡出动画
      commentElement.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      commentElement.style.opacity = '0';
      commentElement.style.transform = 'translateX(-20px)';

      // 动画完成后移除元素
      setTimeout(() => {
        commentElement.remove();
        showXToast('评论已删除', 'success');
      }, 300);

      // 递归删除评论的辅助函数
      const removeCommentById = (comments, targetId) => {
        return comments.filter(comment => {
          if (comment.id === targetId) {
            return false; // 删除匹配的评论
          }
          if (comment.replies && comment.replies.length > 0) {
            comment.replies = removeCommentById(comment.replies, targetId);
          }
          return true;
        });
      };

      // 同时从推文数据中移除这条评论
      try {
        // 更新sessionStorage中的数据
        const currentTweetData = sessionStorage.getItem('currentTweetData');
        if (currentTweetData) {
          const tweetData = JSON.parse(currentTweetData);
          if (tweetData.comments) {
            tweetData.comments = removeCommentById(tweetData.comments, commentId);
            sessionStorage.setItem('currentTweetData', JSON.stringify(tweetData));

            // 更新统计数据
            const commentsCount = document.querySelector('.tweet-stats .comment-count');
            if (commentsCount) {
              const currentCount = parseInt(commentsCount.textContent) || 0;
              if (currentCount > 0) {
                commentsCount.textContent = currentCount - 1;
              }
            }

            // 同时更新数据库中的数据
            const db = getXDB();
            const tweetsData = await db.xTweetsData.get('tweets');

            if (tweetsData) {
              // 在forYouTweets中查找并更新
              if (tweetsData.forYouTweets) {
                const tweetIndex = tweetsData.forYouTweets.findIndex(t => t.id === tweetData.id);
                if (tweetIndex !== -1) {
                  tweetsData.forYouTweets[tweetIndex].comments = removeCommentById(
                    tweetsData.forYouTweets[tweetIndex].comments || [],
                    commentId,
                  );
                  // 更新全局变量
                  forYouTweets[tweetIndex] = tweetsData.forYouTweets[tweetIndex];
                }
              }

              // 在followingTweets中查找并更新
              if (tweetsData.followingTweets) {
                const tweetIndex = tweetsData.followingTweets.findIndex(t => t.id === tweetData.id);
                if (tweetIndex !== -1) {
                  tweetsData.followingTweets[tweetIndex].comments = removeCommentById(
                    tweetsData.followingTweets[tweetIndex].comments || [],
                    commentId,
                  );
                  // 更新全局变量
                  followingTweets[tweetIndex] = tweetsData.followingTweets[tweetIndex];
                }
              }

              // 保存更新后的数据
              await db.xTweetsData.put(tweetsData);
            }

            // 如果是用户自己的推文，也更新用户推文数据
            if (tweetData.id.startsWith('user_')) {
              const userTweets = await db.xUserTweets.get('userTweets');
              if (userTweets && userTweets.tweets) {
                const userTweetIndex = userTweets.tweets.findIndex(t => t.id === tweetData.id);
                if (userTweetIndex !== -1) {
                  userTweets.tweets[userTweetIndex].comments = removeCommentById(
                    userTweets.tweets[userTweetIndex].comments || [],
                    commentId,
                  );
                  await db.xUserTweets.put(userTweets);
                }
              }
            }

            console.log('评论已从数据库中删除:', commentId);
          }
        } else if (currentTweetId) {
          // 如果是主页评论页面，更新主页数据
          const allTweets = [...forYouTweets, ...followingTweets];
          const tweet = allTweets.find(t => t.id === currentTweetId);

          if (tweet && tweet.comments) {
            tweet.comments = removeCommentById(tweet.comments, commentId);
            tweet.stats.comments = Math.max(0, (tweet.stats.comments || 0) - 1);

            // 更新全局数组引用
            const tweetIndex = forYouTweets.findIndex(t => t.id === tweet.id);
            if (tweetIndex !== -1) {
              forYouTweets[tweetIndex] = tweet;
            } else {
              const followingIndex = followingTweets.findIndex(t => t.id === tweet.id);
              if (followingIndex !== -1) {
                followingTweets[followingIndex] = tweet;
              }
            }

            // 保存到数据库
            const db = getXDB();
            await db.xTweetsData.put({
              id: 'tweets',
              forYouTweets: forYouTweets,
              followingTweets: followingTweets,
              lastUpdated: new Date().toISOString(),
            });

            console.log('主页评论已从数据库中删除:', commentId);
          }
        }
      } catch (error) {
        console.error('删除评论数据失败:', error);
        showXToast('删除评论失败，请重试', 'error');
      }
    }
  }

  // 评论点赞功能
  function toggleCommentLike(commentId, element) {
    const isLiked = element.dataset.liked === 'true';
    const currentLikes = parseInt(element.dataset.likes);
    const likeIcon = element.querySelector('.like-icon');
    const likeCount = element.querySelector('.like-count');

    if (isLiked) {
      element.dataset.liked = 'false';
      element.dataset.likes = (currentLikes - 1).toString();
      element.classList.remove('liked');
      likeCount.textContent = (currentLikes - 1).toString();
    } else {
      element.dataset.liked = 'true';
      element.dataset.likes = (currentLikes + 1).toString();
      element.classList.add('liked');
      likeCount.textContent = (currentLikes + 1).toString();

      likeIcon.classList.add('like-animation');
      setTimeout(() => {
        likeIcon.classList.remove('like-animation');
      }, 600);
    }
  }

  // 渲染评论
  function renderComments(tweetId) {
    const container = document.querySelector('.comments-container');
    container.innerHTML = '';

    // 找到对应的推文
    const allTweets = [...forYouTweets, ...followingTweets];
    const tweet = allTweets.find(t => t.id === tweetId);

    if (!tweet || !tweet.comments) return;

    tweet.comments.forEach(comment => {
      // 创建评论组容器
      const commentGroup = document.createElement('div');
      commentGroup.style.cssText = 'position: relative;';

      // 添加主评论
      const commentElement = createCommentElement(comment);

      // 如果有回复，给主评论添加特殊类
      if (comment.replies && comment.replies.length > 0) {
        commentElement.classList.add('has-replies');
      }

      commentGroup.appendChild(commentElement);

      // 为主评论头像添加点击事件
      const commentAvatar = commentElement.querySelector('.tweet-avatar');
      if (commentAvatar) {
        commentAvatar.style.cursor = 'pointer';
        commentAvatar.addEventListener('click', e => {
          e.stopPropagation();
          openAccountProfile(comment.user.name, comment.user.handle, comment.user.avatar);
        });
      }

      // 渲染回复
      if (comment.replies && comment.replies.length > 0) {
        comment.replies.forEach(reply => {
          const replyElement = createCommentElement(reply, true);
          commentGroup.appendChild(replyElement);

          // 为回复头像添加点击事件
          const replyAvatar = replyElement.querySelector('.tweet-avatar');
          if (replyAvatar) {
            replyAvatar.style.cursor = 'pointer';
            replyAvatar.addEventListener('click', e => {
              e.stopPropagation();
              openAccountProfile(reply.user.name, reply.user.handle, reply.user.avatar);
            });
          }
        });
      }

      container.appendChild(commentGroup);
    });

    // 更新所有回复输入框头像
    const replyUserAvatars = document.querySelectorAll('.reply-user-avatar');
    replyUserAvatars.forEach(avatar => {
      avatar.src = userProfileData.avatar;
    });
  }

  // 评论图片数据存储
  let commentImageData = null;
  let detailCommentImageData = null;

  // 触发主页评论图片上传
  function triggerCommentImageUpload() {
    document.getElementById('comment-image-input').click();
  }

  // 处理主页评论图片上传
  function handleCommentImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      commentImageData = e.target.result;
      const preview = document.getElementById('comment-image-preview');
      const img = document.getElementById('comment-image-preview-img');
      img.src = commentImageData;
      preview.style.display = 'block';

      showXToast('图片已添加', 'success');
    };
    reader.readAsDataURL(file);
  }

  // 移除主页评论图片
  function removeCommentImage() {
    commentImageData = null;
    const preview = document.getElementById('comment-image-preview');
    const img = document.getElementById('comment-image-preview-img');
    img.src = '';
    preview.style.display = 'none';
    document.getElementById('comment-image-input').value = '';
  }

  // 触发详情页评论图片上传
  function triggerDetailCommentImageUpload() {
    document.getElementById('detail-comment-image-input').click();
  }

  // 处理详情页评论图片上传
  function handleDetailCommentImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      detailCommentImageData = e.target.result;
      const preview = document.getElementById('detail-comment-image-preview');
      const img = document.getElementById('detail-comment-image-preview-img');
      img.src = detailCommentImageData;
      preview.style.display = 'block';

      showXToast('图片已添加', 'success');
    };
    reader.readAsDataURL(file);
  }

  // 移除详情页评论图片
  function removeDetailCommentImage() {
    detailCommentImageData = null;
    const preview = document.getElementById('detail-comment-image-preview');
    const img = document.getElementById('detail-comment-image-preview-img');
    img.src = '';
    preview.style.display = 'none';
    document.getElementById('detail-comment-image-input').value = '';
  }

  // 处理评论输入
  function handleCommentInput(event) {
    const textarea = event.target;
    const replyBtn = document.getElementById('reply-btn');

    // 更新按钮状态
    if (textarea.value.trim().length > 0) {
      replyBtn.style.opacity = '1';
      replyBtn.disabled = false;
    } else {
      replyBtn.style.opacity = '0.5';
      replyBtn.disabled = true;
    }

    // 回车发送评论（Shift+回车换行）
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      if (textarea.value.trim().length > 0) {
        submitComment();
      }
    }
  }

  // 自动调整textarea高度
  function autoResize(textarea) {
    textarea.style.height = '20px';
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';

    // 更新按钮状态
    const replyBtn = document.getElementById('reply-btn');
    if (textarea.value.trim().length > 0) {
      replyBtn.style.opacity = '1';
      replyBtn.disabled = false;
    } else {
      replyBtn.style.opacity = '0.5';
      replyBtn.disabled = true;
    }
  }

  // 当前正在查看的推文ID
  let currentTweetId = null;

  // 提交评论
  async function submitComment() {
    const textarea = document.getElementById('comment-input');
    const content = textarea.value.trim();

    if (content.length === 0 || !currentTweetId) return;

    // 获取当前推文数据
    const allTweets = [...forYouTweets, ...followingTweets];
    const tweet = allTweets.find(t => t.id === currentTweetId);

    if (!tweet) {
      showXToast('无法找到对应的推文', 'error');
      return;
    }

    // 检查是否为仅自己可见的帖子（主页推文一般不会有private标记，但为了统一）
    if (tweet.privacy === 'private') {
      showXToast('私有帖子不支持回复功能', 'error');
      return;
    }

    // 创建新评论对象（使用window.userProfileData确保获取最新账号数据）
    const newComment = {
      id: 'new-' + Date.now(),
      user: {
        name: window.userProfileData.name,
        handle: window.userProfileData.handle,
        avatar: window.userProfileData.avatar,
        verified: window.userProfileData.verified,
      },
      content: content,
      time: '刚刚',
      replies: [],
    };

    // 如果有图片，添加图片数据
    if (commentImageData) {
      newComment.image = {
        type: 'upload',
        content: commentImageData,
      };
    }

    // 添加到对应推文的评论列表
    if (tweet) {
      // 确保评论列表存在
      if (!tweet.comments) {
        tweet.comments = [];
      }
      tweet.comments.push(newComment);
      tweet.stats.comments += 1;

      // 强制更新全局数组引用，确保数据同步
      const tweetIndex = forYouTweets.findIndex(t => t.id === tweet.id);
      if (tweetIndex !== -1) {
        forYouTweets[tweetIndex] = tweet;
      } else {
        const followingIndex = followingTweets.findIndex(t => t.id === tweet.id);
        if (followingIndex !== -1) {
          followingTweets[followingIndex] = tweet;
        }
      }

      // 保存更新后的推文数据
      try {
        const db = getXDB();

        await db.xTweetsData.put({
          id: 'tweets',
          forYouTweets: forYouTweets,
          followingTweets: followingTweets,
          lastUpdated: new Date().toISOString(),
        });

        console.log('用户评论已保存到数据库，评论ID:', newComment.id);
      } catch (saveError) {
        console.error('保存评论数据失败:', saveError);
      }
    }

    // 重新渲染评论
    renderComments(currentTweetId);

    // 清空输入框并重置高度
    textarea.value = '';
    textarea.style.height = '20px';

    // 清除图片
    if (commentImageData) {
      removeCommentImage();
    }

    // 重置按钮状态
    const replyBtn = document.getElementById('reply-btn');
    replyBtn.style.opacity = '0.5';
    replyBtn.disabled = true;

    // 滚动到底部显示新评论
    const commentsContainer = document.querySelector('.comments-container');
    setTimeout(() => {
      commentsContainer.scrollTop = commentsContainer.scrollHeight;
    }, 100);

    showXToast('你的评论等待回复中', 'info');

    // 触发AI回复 - 判断是否为用户自己的帖子（主页推文中用户自己的帖子需要特别处理）
    const isOwnPost = tweet.user && (tweet.user.handle === userProfileData.handle || tweet.id.startsWith('user_'));

    // 延迟触发AI回复，确保用户评论已经完全渲染和保存
    setTimeout(async () => {
      await generateUnifiedAIResponse(tweet, newComment, {
        isOwnPost,
        commentType: 'main_comment',
        pageType: 'main',
        parentComment: null,
      });
    }, 100);
  }

  // 显示回复输入框
  function showReplyInput(commentId, userHandle) {
    // 隐藏所有其他回复输入框
    document.querySelectorAll('.reply-input-container').forEach(container => {
      container.style.display = 'none';
    });

    // 显示当前评论的回复输入框
    const replyContainer = document.getElementById(`reply-input-${commentId}`);
    if (replyContainer) {
      replyContainer.style.display = 'block';
      const textarea = replyContainer.querySelector('textarea');
      textarea.focus();
    }
  }

  // 取消回复
  function cancelReply(commentId) {
    const replyContainer = document.getElementById(`reply-input-${commentId}`);
    if (replyContainer) {
      replyContainer.style.display = 'none';
      const textarea = replyContainer.querySelector('textarea');
      textarea.value = '';
      textarea.style.height = '20px';

      // 重置按钮状态
      const replyBtn = document.getElementById(`reply-btn-${commentId}`);
      replyBtn.style.opacity = '0.5';
      replyBtn.disabled = true;
    }
  }

  // 处理回复输入
  function handleReplyInput(event, commentId, userHandle) {
    const textarea = event.target;
    const replyBtn = document.getElementById(`reply-btn-${commentId}`);

    // 更新按钮状态
    if (textarea.value.trim().length > 0) {
      replyBtn.style.opacity = '1';
      replyBtn.disabled = false;
    } else {
      replyBtn.style.opacity = '0.5';
      replyBtn.disabled = true;
    }

    // 回车发送回复
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      if (textarea.value.trim().length > 0) {
        submitReply(commentId, userHandle);
      }
    }
  }

  // 自动调整回复textarea高度
  function autoResizeReply(textarea, commentId) {
    textarea.style.height = '20px';
    textarea.style.height = Math.min(textarea.scrollHeight, 80) + 'px';

    // 更新按钮状态
    const replyBtn = document.getElementById(`reply-btn-${commentId}`);
    if (textarea.value.trim().length > 0) {
      replyBtn.style.opacity = '1';
      replyBtn.disabled = false;
    } else {
      replyBtn.style.opacity = '0.5';
      replyBtn.disabled = true;
    }
  }

  // 提交回复
  async function submitReply(commentId, replyToHandle) {
    const replyContainer = document.getElementById(`reply-input-${commentId}`);
    const textarea = replyContainer.querySelector('textarea');
    const content = textarea.value.trim();

    if (content.length === 0) return;

    // 获取当前推文数据 - 先尝试从sessionStorage（详情页），再从主页数据
    let tweetData = null;
    const currentTweetDataFromSession = sessionStorage.getItem('currentTweetData');

    if (currentTweetDataFromSession) {
      // 详情页面的情况
      try {
        tweetData = JSON.parse(currentTweetDataFromSession);
      } catch (e) {
        console.error('解析sessionStorage推文数据失败:', e);
      }
    }

    if (!tweetData && currentTweetId) {
      // 主页推文的情况
      const allTweets = [...forYouTweets, ...followingTweets];
      tweetData = allTweets.find(t => t.id === currentTweetId);
    }

    if (!tweetData) {
      showXToast('无法获取推文信息', 'error');
      return;
    }

    // 检查是否为仅自己可见的帖子
    if (tweetData.privacy === 'private') {
      showXToast('私有帖子不支持回复功能', 'error');
      return;
    }

    // 找到被回复的评论 - 支持楼中楼回复并处理为平级显示
    let parentComment = null;
    let mainCommentId = commentId; // 用于查找主评论ID（对于楼中楼回复）
    const isDetailPage = !!currentTweetDataFromSession;
    const commentsContainer = isDetailPage
      ? document.getElementById('detail-comments-container')
      : document.querySelector('.comments-container');
    const allComments = commentsContainer.querySelectorAll('.comment-item');

    // 首先找到被回复的评论
    let targetCommentEl = null;
    allComments.forEach(commentEl => {
      if (commentEl.dataset.commentId === commentId) {
        targetCommentEl = commentEl;
      }
    });

    if (targetCommentEl) {
      // 从DOM中提取评论信息构建parentComment
      const userName = targetCommentEl.querySelector('.tweet-user-name').textContent;
      const userHandle = targetCommentEl.querySelector('.tweet-user-handle').textContent;
      const commentContent = targetCommentEl.querySelector('.comment-content').textContent.trim();

      parentComment = {
        id: commentId,
        user: { name: userName, handle: userHandle },
        content: commentContent,
      };

      // 如果被回复的是楼中楼，需要找到对应的主评论ID（用于数据存储）
      if (targetCommentEl.classList.contains('reply-item')) {
        // 向上查找同一个评论组中的主评论
        let currentEl = targetCommentEl.previousElementSibling;
        while (currentEl && currentEl.classList.contains('reply-item')) {
          currentEl = currentEl.previousElementSibling;
        }
        if (currentEl && currentEl.classList.contains('comment-item') && !currentEl.classList.contains('reply-item')) {
          mainCommentId = currentEl.dataset.commentId;
        } else {
          // 如果向上没找到，可能是第一个回复，向上查找父容器中的主评论
          let parentContainer = targetCommentEl.parentNode;
          let firstComment = parentContainer.querySelector('.comment-item:not(.reply-item)');
          if (firstComment) {
            mainCommentId = firstComment.dataset.commentId;
          }
        }
      }
    }

    // 创建新回复对象（使用window.userProfileData确保获取最新账号数据）
    const newReply = {
      id: 'reply-' + Date.now(),
      user: {
        name: window.userProfileData.name,
        handle: window.userProfileData.handle,
        avatar: window.userProfileData.avatar,
        verified: window.userProfileData.verified,
      },
      content: content,
      time: '刚刚',
      replyTo: replyToHandle,
      replies: [],
    };

    if (isDetailPage) {
      // 详情页面：渲染到页面并同时保存到数据库 - 修复楼中楼插入位置
      const commentElement = createCommentElement(newReply, true);

      if (targetCommentEl) {
        let insertAfter = null;

        if (targetCommentEl.classList.contains('reply-item')) {
          // 如果回复的是楼中楼，找到这个评论组的最后一个评论
          let nextSibling = targetCommentEl.nextElementSibling;
          insertAfter = targetCommentEl;

          // 找到当前评论组的最后一条评论
          while (nextSibling && nextSibling.classList.contains('reply-item')) {
            insertAfter = nextSibling;
            nextSibling = nextSibling.nextElementSibling;
          }
        } else {
          // 如果回复的是主评论，找到这个评论组的最后一条评论（包括所有楼中楼）
          let nextSibling = targetCommentEl.nextElementSibling;
          insertAfter = targetCommentEl;

          while (nextSibling && nextSibling.classList.contains('reply-item')) {
            insertAfter = nextSibling;
            nextSibling = nextSibling.nextElementSibling;
          }
        }

        // 插入到正确位置
        if (insertAfter.nextSibling) {
          insertAfter.parentNode.insertBefore(commentElement, insertAfter.nextSibling);
        } else {
          insertAfter.parentNode.appendChild(commentElement);
        }
      }

      // 同时保存到sessionStorage中的推文数据
      try {
        let updatedTweetData = JSON.parse(sessionStorage.getItem('currentTweetData'));
        if (updatedTweetData) {
          const mainComment = updatedTweetData.comments.find(c => c.id === mainCommentId);
          if (mainComment) {
            if (!mainComment.replies) mainComment.replies = [];
            mainComment.replies.push(newReply);

            // 更新sessionStorage
            sessionStorage.setItem('currentTweetData', JSON.stringify(updatedTweetData));

            // 同时保存到数据库
            const db = getXDB();

            // 更新对应的推文数据到数据库
            const tweetsData = await db.xTweetsData.get('tweets');
            if (tweetsData) {
              // 在forYouTweets和followingTweets中查找并更新
              let updated = false;

              if (tweetsData.forYouTweets) {
                const tweetIndex = tweetsData.forYouTweets.findIndex(t => t.id === updatedTweetData.id);
                if (tweetIndex !== -1) {
                  tweetsData.forYouTweets[tweetIndex] = updatedTweetData;
                  updated = true;
                }
              }

              if (!updated && tweetsData.followingTweets) {
                const tweetIndex = tweetsData.followingTweets.findIndex(t => t.id === updatedTweetData.id);
                if (tweetIndex !== -1) {
                  tweetsData.followingTweets[tweetIndex] = updatedTweetData;
                  updated = true;
                }
              }

              // 如果是用户自己的推文，更新到用户推文数据
              if (updatedTweetData.id.startsWith('user_')) {
                const accountTweetsId = `userTweets_${currentAccountId || 'main'}`;
                const userTweets = await db.xUserTweets.get(accountTweetsId);
                if (userTweets && userTweets.tweets) {
                  const userTweetIndex = userTweets.tweets.findIndex(t => t.id === updatedTweetData.id);
                  if (userTweetIndex !== -1) {
                    userTweets.tweets[userTweetIndex] = updatedTweetData;
                    await db.xUserTweets.put(userTweets);
                    console.log('✅ 用户推文已更新到账户:', accountTweetsId);
                  }
                }
              }

              if (updated) {
                await db.xTweetsData.put(tweetsData);
                console.log('详情页评论已保存到数据库');
              }
            }
          }
        }
      } catch (saveError) {
        console.error('保存详情页评论失败:', saveError);
      }
    } else {
      // 主页推文：添加到数据并重新渲染 - 支持楼中楼平级回复
      const mainComment = tweetData.comments.find(c => c.id === mainCommentId);
      if (mainComment) {
        if (!mainComment.replies) mainComment.replies = [];
        mainComment.replies.push(newReply);

        // 强制更新全局数组引用，确保数据同步
        const tweetIndex = forYouTweets.findIndex(t => t.id === tweetData.id);
        if (tweetIndex !== -1) {
          forYouTweets[tweetIndex] = tweetData;
        } else {
          const followingIndex = followingTweets.findIndex(t => t.id === tweetData.id);
          if (followingIndex !== -1) {
            followingTweets[followingIndex] = tweetData;
          }
        }

        // 保存更新后的推文数据
        try {
          const db = getXDB();

          await db.xTweetsData.put({
            id: 'tweets',
            forYouTweets: forYouTweets,
            followingTweets: followingTweets,
            lastUpdated: new Date().toISOString(),
          });

          console.log('用户回复已保存到数据库，回复ID:', newReply.id);
        } catch (saveError) {
          console.error('保存回复数据失败:', saveError);
        }

        // 重新渲染评论
        renderComments(currentTweetId);
      }
    }

    // 隐藏回复输入框
    cancelReply(commentId);

    showXToast('你的评论等待回复中', 'info');

    // 触发AI回复 - 判断是否为用户自己的帖子
    const isOwnPost =
      tweetData.user && (tweetData.user.handle === userProfileData.handle || tweetData.id.startsWith('user_'));

    // 延迟触发AI回复，确保用户回复已经完全渲染和保存
    setTimeout(async () => {
      await generateUnifiedAIResponse(tweetData, newReply, {
        isOwnPost,
        commentType: 'reply_comment',
        pageType: isDetailPage ? 'detail' : 'main',
        parentComment,
        mainCommentId, // 传递主评论ID用于楼中楼回复处理
      });
    }, 100);
  }

  // 修改显示推文评论页面函数，保存当前推文ID
  function showTweetComments(tweetId) {
    currentTweetId = tweetId;

    // 清除sessionStorage中的推文数据，避免主页评论时使用错误的详情页数据
    sessionStorage.removeItem('currentTweetData');
    console.log('✅ 已清除详情页数据缓存，当前查看主页推文:', tweetId);

    // 隐藏所有页面
    document.querySelectorAll('.x-page').forEach(page => {
      page.style.display = 'none';
    });

    // 显示评论页面
    const commentsPage = document.getElementById('x-comments-page');
    commentsPage.style.display = 'flex';

    // 渲染评论
    renderComments(tweetId);

    // 清空输入框
    const textarea = document.getElementById('comment-input');
    if (textarea) {
      textarea.value = '';
      textarea.style.height = '20px';
    }

    // 重置按钮状态
    const replyBtn = document.getElementById('reply-btn');
    if (replyBtn) {
      replyBtn.style.opacity = '0.5';
      replyBtn.disabled = true;
    }
  }

  // X风格提示框
  function showXToast(message, type = 'success') {
    // 移除现有的提示框
    const existingToast = document.querySelector('.x-toast');
    if (existingToast) {
      existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = 'x-toast';
    toast.style.cssText = `
              position: fixed;
              top: 80px;
              left: 50%;
              transform: translateX(-50%);
              background-color: ${type === 'success' ? '#1d9bf0' : '#f4212e'};
              color: #fff;
              padding: 12px 20px;
              border-radius: 20px;
              font-size: 15px;
              font-weight: 600;
              z-index: 1000;
              box-shadow: 0 4px 12px rgba(0,0,0,0.3);
              animation: fadeInOut 3s ease-in-out forwards;
            `;
    toast.textContent = message;

    // 添加淡入淡出动画
    const style = document.createElement('style');
    style.textContent = `
              @keyframes fadeInOut {
              0 % { opacity: 0; transform: translateX(-50 %) translateY(- 20px); }
            15% {opacity: 1; transform: translateX(-50%) translateY(0); }
            85% {opacity: 1; transform: translateX(-50%) translateY(0); }
            100% {opacity: 0; transform: translateX(-50%) translateY(-20px); }
              }
            `;
    document.head.appendChild(style);
    document.body.appendChild(toast);

    // 3秒后自动移除
    setTimeout(() => {
      if (toast.parentNode) {
        toast.remove();
      }
      if (style.parentNode) {
        style.remove();
      }
    }, 3000);
  }
  // ▼▼▼ 【主要！！！】第一个情景：推文生成器▼▼▼
  async function refreshXTweets() {
    const refreshBtn = document.querySelector('.x-refresh-btn');

    // 添加旋转动画
    refreshBtn.style.animation = 'spin 1s linear infinite';
    const spinStyle = document.createElement('style');
    spinStyle.textContent = `
              @keyframes spin {
              from {transform: rotate(0deg); }
            to {transform: rotate(360deg); }
              }
            `;
    document.head.appendChild(spinStyle);

    try {
      // CSV解析函数
      function parseCSVToTweets(csvText) {
        const lines = csvText
          .split('\n')
          .map(line => line.trim())
          .filter(line => line);

        const tweetsData = {
          forYouTweets: [],
          followingTweets: [],
        };

        let currentSection = '';
        let tweetIndex = 0;

        for (const line of lines) {
          if (line.includes('=== 为你推荐 ===')) {
            currentSection = 'forYou';
            tweetIndex = 0;
            continue;
          } else if (line.includes('=== 正在关注 ===')) {
            currentSection = 'following';
            tweetIndex = 0;
            continue;
          }

          // 跳过表头
          if (line.includes('用户名,用户句柄,用户头像,是否认证') || line.includes('评论1用户名,评论1句柄')) {
            continue;
          }

          // 解析推文数据行
          if (currentSection && line.includes(',')) {
            const values = line.split(',').map(v => v.trim());

            if (values.length >= 12) {
              // 至少包含基本推文信息（包括头像字段）
              const tweet = {
                id: `${currentSection}_${tweetIndex}`,
                user: {
                  name: values[0] || '匿名用户',
                  handle: values[1] || '@anonymous',
                  avatar: values[2] || 'https://i.postimg.cc/4xmx7V4R/mmexport1759081128356.jpg',
                  verified: values[3] === '是',
                },
                content: values[4] || '',
                time: values[5] || '刚刚',
                media: values[6]
                  ? [
                      {
                        type: 'image',
                        description: values[6],
                        sensitive: values[7] === '是',
                      },
                    ]
                  : [],
                stats: {
                  comments: parseInt(values[8]) || 0,
                  retweets: parseInt(values[9]) || 0,
                  likes: parseInt(values[10]) || 0,
                  views: parseInt(values[11]) || 0,
                },
                comments: [],
              };

              // 解析引用推文数据（如果存在）
              // 检查引用字段：索引12-18是引用相关字段（引用类型、引用用户名、引用句柄、引用头像、引用认证、引用内容、引用时间）
              if (values.length >= 19 && values[12] && values[13] && values[17]) {
                tweet.quotedTweet = {
                  type: values[12] || 'tweet', // 'tweet' 或 'comment'
                  user: {
                    name: values[13] || '引用用户',
                    handle: values[14] || '@quoted',
                    avatar: values[15] || 'https://i.postimg.cc/4xmx7V4R/mmexport1759081128356.jpg',
                    verified: values[16] === '是',
                  },
                  content: values[17] || '',
                  time: values[18] || '刚刚',
                };
              }

              // 统一处理评论解析：所有推文的评论都从索引19开始
              // 无论是否有引用推文，评论字段的位置都是固定的
              const comments = [];
              const commentStartIndex = 19; // 12个基本字段 + 7个引用字段 = 19

              // 从索引19开始，每7个字段为一个评论：用户名、句柄、头像、认证、内容、时间、回复对象
              let commentIndex = 1;
              let startIndex = commentStartIndex;

              while (startIndex + 6 < values.length) {
                const commentName = values[startIndex];
                const commentHandle = values[startIndex + 1];
                const commentAvatar = values[startIndex + 2];
                const commentVerified = values[startIndex + 3];
                const commentContent = values[startIndex + 4];
                const commentTime = values[startIndex + 5];
                const commentReplyTo = values[startIndex + 6];

                // 检查评论是否有效（至少需要用户名、句柄、内容）
                if (commentName && commentHandle && commentContent) {
                  const newComment = {
                    id: `${tweet.id}_c${commentIndex}`,
                    user: {
                      name: commentName,
                      handle: commentHandle,
                      avatar: commentAvatar || 'https://i.postimg.cc/4xmx7V4R/mmexport1759081128356.jpg',
                      verified: commentVerified === '是',
                    },
                    content: commentContent,
                    time: commentTime || '刚刚',
                    replyTo: commentReplyTo || '',
                    replies: [],
                  };

                  // 如果这个评论是回复其他评论，找到被回复的评论并添加为回复
                  if (commentReplyTo) {
                    const targetComment = comments.find(c => c.user.handle === commentReplyTo);
                    if (targetComment) {
                      targetComment.replies.push(newComment);
                    } else {
                      // 如果找不到被回复的评论，作为独立评论添加
                      comments.push(newComment);
                    }
                  } else {
                    // 独立评论
                    comments.push(newComment);
                  }

                  commentIndex++;
                } else {
                  // 如果遇到空的评论字段，停止解析
                  break;
                }

                // 移动到下一个评论的起始位置
                startIndex += 7;
              }

              tweet.comments = comments;

              if (currentSection === 'forYou') {
                tweetsData.forYouTweets.push(tweet);
              } else if (currentSection === 'following') {
                tweetsData.followingTweets.push(tweet);
              }

              tweetIndex++;
            }
          }
        }

        return tweetsData;
      }
      // 从数据库读取API配置和X设置
      const db = getDB(); // 用于访问API配置
      const xDb = getXDB(); // 用于访问X专用设置

      // 定义X社交页面需要的API辅助函数
      function toGeminiRequestData(model, apiKey, systemPrompt, messages) {
        const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models';
        return {
          url: `${GEMINI_API_URL}/${model}:generateContent?key=${apiKey}`,
          data: {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: systemPrompt + '\n\n' + messages.map(m => m.content).join('\n'),
                    },
                  ],
                },
              ],
            }),
          },
        };
      }

      function getGeminiResponseText(data) {
        if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) {
          return data.candidates[0].content.parts[0].text || '';
        }
        return '';
      }

      const apiConfig = await db.apiConfig.get('main');
      if (!apiConfig || !apiConfig.proxyUrl || !apiConfig.apiKey || !apiConfig.model) {
        showXToast('请先配置API设置', 'error');
        refreshBtn.style.animation = '';
        return;
      }

      const { proxyUrl, apiKey, model } = apiConfig;

      // 从X设置中读取配置（按账号读取）
      const settingsId = `xSettings_${currentAccountId || 'main'}`;
      const xSettings = await xDb.xSettings.get(settingsId);
      const userPrompt = xSettings?.systemPrompt || '';
      const worldSetting = xSettings?.worldSetting || '';
      const boundCharacters = xSettings?.boundCharacters || [];

      // 读取绑定的NPC数据（从全局读取）
      const npcDataId = 'xNPCs_global'; // 全局存储，所有账号共享
      const npcData = await xDb.xNPCs.get(npcDataId);
      const allNPCs = npcData?.npcs || [];
      // 过滤出绑定了当前用户的NPC
      const currentAccount = currentAccountId || 'main';
      const boundNPCs = allNPCs.filter(npc => npc.boundUsers && npc.boundUsers.includes(currentAccount));

      if (boundNPCs.length > 0) {
        console.log(
          `📋 已加载 ${boundNPCs.length} 个绑定NPC:`,
          boundNPCs.map(n => `${n.name}(${n.handle})`).join(', '),
        );
      }

      // 使用工具函数构建用户X个人资料信息（使用window.userProfileData确保获取最新数据）
      const userXProfileInfo = StringBuilders.buildUserXProfileInfo(window.userProfileData);

      // 调试：输出用户身份识别设置
      console.log('🎭 绑定角色数量:', boundCharacters.length);
      if (boundCharacters.length > 0) {
        console.log('🎭 绑定角色列表:', boundCharacters);
      }
      console.log('👤 已知身份角色数:', window.userProfileData.knownIdentityCharacters?.length || 0);
      if (window.userProfileData.knownIdentityCharacters?.length > 0) {
        console.log('👤 已知身份角色列表:', window.userProfileData.knownIdentityCharacters);
      }

      // 1. 提示词 + 世界书
      let systemPrompt = StringBuilders.buildBaseSystemPrompt({
        userPrompt,
        worldSetting,
      });

      // 2. 角色定义（推文生成专用）
      systemPrompt += `

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 核心任务说明 🎯
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
你是X社交平台的内容生成器。请生成两组推文数据：
- "为你推荐"页面（热门有趣内容）
- "正在关注"页面（个人生活日常）

**你只负责生成其他用户的推文，绝不生成用户本人的推文！**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

【生成要求】：
- 每组生成3-8条推文，内容多样化
- 热门推文5-12条评论，普通推文1-5条，支持多层级楼中楼回复
- **绑定角色可以作为推文发布者**：根据角色设定和兴趣发布独立推文
- **绑定NPC可以作为推文发布者**：根据NPC人设和发帖习惯发布推文
- NPC关系互动：有绑定关系的NPC在角色推文下自然留言，体现关系特点
- 普通用户头像统一：https://i.postimg.cc/4xmx7V4R/mmexport1759081128356.jpg
- 引用推文功能：约20-30%的推文可以使用引用功能，适合表达观点、评论热点、转发有趣内容

【情侣关系与粉丝群体规则】：
${
  userXProfileInfo.verificationType === 'couple' && userXProfileInfo.coupleCharacterName
    ? `- **情侣关系自然化**：用户与${userXProfileInfo.coupleCharacterName}是公开情侣，但这是私人关系
  - 情侣角色可以偶尔出现在推文/评论中，但频率要低（建议10-20%概率），保持自然
  - 情侣互动应该围绕推文主题，不要每次都强调情侣身份
  - 粉丝群体判断：
    * 如果用户或情侣角色有明星/网红/公众人物等身份 → 可以生成少量CP粉丝评论（最多1-2条）
    * 如果都是普通人身份 → 禁止生成"磕CP""嗑糖"等粉丝向评论，普通情侣不会有粉丝群体`
    : '- **普通情侣关系**：如果生成情侣内容，确保只在适合的场景下出现，且不应有粉丝群体'
}`;

      // 3. 角色资料（推文发布场景）
      const charactersInfo = await StringBuilders.buildCompleteCharacterInfo(
        boundCharacters,
        userXProfileInfo,
        'tweet',
      );
      if (charactersInfo) {
        systemPrompt += charactersInfo;
      }

      // 3.5. NPC资料（绑定NPC信息）
      if (boundNPCs.length > 0) {
        systemPrompt += `

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 绑定NPC资料
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
以下是与当前用户绑定的NPC，他们可以在推文生成中作为独立用户出现：

`;
        for (const npc of boundNPCs) {
          systemPrompt += `
【NPC基本信息】
- X姓名：${npc.name}
- X句柄：${npc.handle}
- X头像：${npc.avatar}
- 认证状态：false（NPC默认无认证）

【NPC人设】
${npc.personality || '暂无人设描述'}

【发帖习惯】
${npc.postingHabits || '暂无发帖习惯描述'}

【主页内容】
${npc.homepage || '暂无主页内容设置'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;
        }

        systemPrompt += `
【NPC使用规则】：
1. NPC可以作为推文发布者，生成符合其人设和发帖习惯的推文
2. NPC可以在评论区出现，根据其人设进行互动
3. NPC的内容应该围绕其人设和主页内容展开
4. NPC与角色/用户的互动应该自然，不要过于频繁
5. 严格使用NPC的X姓名(${boundNPCs.map(n => n.name).join('、')})、句柄(${boundNPCs.map(n => n.handle).join('、')})和头像
6. NPC认证状态固定为 false
`;
      }

      // 4. 用户资料
      systemPrompt += StringBuilders.buildUniversalConstraints(userXProfileInfo);

      systemPrompt += `

【JSON返回格式】：
\`\`\`json
{"forYouTweets": [推文数组], "followingTweets": [推文数组]}
\`\`\`

推文对象结构：
- user: {name, handle, avatar, verified}
- content: 推文文本
- time: 时间描述
- stats: {comments, retweets, likes, views} (纯数字)
- media: [{type:"description", description:"文字描述，至少30字"}] (可选)
- quotedTweet: {type, user, content, time} (可选，约20-30%推文使用)
- comments: [评论数组] (3-8条热门推文，1-4条普通推文)

评论对象结构：
- user: {name, handle, avatar, verified}
- content: 评论文本
- time: 时间描述  
- replies: [回复数组] (可选，支持多层级但不超过3层)
- replyTo: "@被回复者句柄" (楼中楼回复时必填)

关键规则：
1. verified字段必须是布尔值(true/false)
2. stats中所有数字必须是纯数字，不带引号
3. 可选字段不使用时完全省略，不要设为null
4. content直接写内容，不用引号包裹`;

      const messages = [{ role: 'user', content: '请生成新的X社交平台推文数据' }];

      // 判断API类型并发送请求
      let isGemini = proxyUrl.includes('generativelanguage');
      let response;

      if (isGemini) {
        // 为X社交页面创建正确的Gemini请求配置
        const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models';
        const geminiConfig = {
          url: `${GEMINI_API_URL}/${model}:generateContent?key=${getRandomValue(apiKey)}`,
          data: {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: systemPrompt + '\n\n' + messages.map(m => m.content).join('\n'),
                    },
                  ],
                },
              ],
              generationConfig: {
                temperature: 0.8,
              },
            }),
          },
        };
        response = await fetch(geminiConfig.url, geminiConfig.data);
      } else {
        const openAiPayload = {
          model: model,
          messages: [{ role: 'system', content: systemPrompt }, ...messages],
          temperature: 0.8,
          stream: false,
        };
        response = await fetch(`${proxyUrl}/v1/chat/completions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify(openAiPayload),
        });
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API错误: ${response.status} - ${errorData.error?.message || response.statusText}`);
      }

      const data = await response.json();
      let aiResponseContent;

      if (isGemini) {
        aiResponseContent = getGeminiResponseText(data);
      } else {
        // OpenAI格式
        aiResponseContent = data.choices?.[0]?.message?.content || '';
      }

      console.log('AI原始响应:', aiResponseContent);

      // 解析AI返回的JSON数据
      const cleanedResponse = aiResponseContent
        .replace(/```json\s*/i, '')
        .replace(/```\s*$/, '')
        .trim();

      if (!cleanedResponse) {
        throw new Error('AI返回了空的响应内容');
      }

      let newTweetsData;
      try {
        newTweetsData = JSON.parse(cleanedResponse);
      } catch (parseError) {
        console.error('JSON解析失败:', parseError);
        console.error('尝试解析的内容:', cleanedResponse.substring(0, 500) + '...');
        throw new Error(`AI返回的数据不是有效的JSON格式: ${parseError.message}`);
      }

      // 验证数据格式
      if (!newTweetsData.forYouTweets || !newTweetsData.followingTweets) {
        throw new Error('AI返回的数据格式不正确，缺少必要字段');
      }

      // 为推文添加必要的ID和格式化
      const processTweets = tweets => {
        return tweets.map(tweet => {
          // 确保stats字段存在
          if (!tweet.stats) {
            tweet.stats = {
              comments: tweet.comments?.length || 0,
              retweets: 0,
              likes: 0,
              views: 0,
            };
          }

          // 处理评论数据，添加ID
          if (tweet.comments) {
            tweet.comments = tweet.comments.map(comment => {
              const processedComment = {
                ...comment,
                id: `c_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
              };

              // 处理回复数据
              if (comment.replies) {
                processedComment.replies = comment.replies.map(reply => ({
                  ...reply,
                  id: `r_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                }));
              }

              return processedComment;
            });
          }

          return tweet;
        });
      };

      newTweetsData.forYouTweets = processTweets(newTweetsData.forYouTweets);
      newTweetsData.followingTweets = processTweets(newTweetsData.followingTweets);

      // 为推文分配ID
      const timestamp = Date.now();
      newTweetsData.forYouTweets.forEach((tweet, index) => {
        tweet.id = `fy_${timestamp}_${index}`;
      });

      newTweetsData.followingTweets.forEach((tweet, index) => {
        tweet.id = `fl_${timestamp}_${index}`;
      });

      // 更新全局数据
      forYouTweets.length = 0;
      followingTweets.length = 0;
      forYouTweets.push(...newTweetsData.forYouTweets);
      followingTweets.push(...newTweetsData.followingTweets);

      // 保存推文数据到数据库
      try {
        await xDb.xTweetsData.put({
          id: 'tweets',
          forYouTweets: newTweetsData.forYouTweets,
          followingTweets: newTweetsData.followingTweets,
          lastUpdated: new Date().toISOString(),
        });
      } catch (saveError) {
        console.error('保存推文数据失败:', saveError);
      }

      // 检查是否有人@用户
      const userHandle = userXProfileInfo.handle;
      let mentionFound = false;

      // 检查"为你推荐"中的推文和评论
      for (const tweet of newTweetsData.forYouTweets) {
        if (tweet.content && tweet.content.includes(userHandle)) {
          mentionFound = true;
          break;
        }
        if (tweet.comments) {
          for (const comment of tweet.comments) {
            if (comment.content && comment.content.includes(userHandle)) {
              mentionFound = true;
              break;
            }

            // 检查回复中的内容
            if (comment.replies) {
              for (const reply of comment.replies) {
                if (reply.content && reply.content.includes(userHandle)) {
                  mentionFound = true;
                  break;
                }
              }
            }
            if (mentionFound) break;
          }
        }
        if (mentionFound) break;
      }

      // 检查"正在关注"中的推文和评论
      if (!mentionFound) {
        for (const tweet of newTweetsData.followingTweets) {
          if (tweet.content && tweet.content.includes(userHandle)) {
            mentionFound = true;
            break;
          }
          if (tweet.comments) {
            for (const comment of tweet.comments) {
              if (comment.content && comment.content.includes(userHandle)) {
                mentionFound = true;
                break;
              }
              // 检查回复中的内容
              if (comment.replies) {
                for (const reply of comment.replies) {
                  if (reply.content && reply.content.includes(userHandle)) {
                    mentionFound = true;
                    break;
                  }
                }
              }
              if (mentionFound) break;
            }
          }
          if (mentionFound) break;
        }
      }

      // 重新渲染页面
      renderTweets(forYouTweets, 'for-you-content');
      renderTweets(followingTweets, 'following-content');

      // 显示相应的提醒消息
      if (mentionFound) {
        showXToast('推文已刷新！有人提到你了哦 🔔', 'success');
      } else {
        showXToast('推文已刷新！', 'success');
      }
    } catch (error) {
      console.error('刷新推文失败:', error);
      showXToast(`刷新失败: ${error.message}`, 'error');
    } finally {
      // 停止旋转动画
      refreshBtn.style.animation = '';
      if (spinStyle.parentNode) {
        spinStyle.remove();
      }
    }
  }
  // ▲▲▲ 【主要！！！】第一个情景：推文生成器 ▲▲▲

  // ▼▼▼ 【主要！！！】第七个情景：账户主页生成器 ▼▼▼
  // 当前查看的账户数据
  let currentViewingAccount = null;

  // 打开账户主页
  window.openAccountProfile = async function (accountName, accountHandle, accountAvatar) {
    try {
      console.log(`🔍 正在打开账户主页: ${accountName} (${accountHandle})`);

      // 先检查数据库中是否有已保存的账户主页数据
      const xDB = getXDB();
      const cleanHandle = accountHandle.replace('@', '');
      const savedProfile = await xDB.xAccountProfiles.get(cleanHandle);

      if (savedProfile) {
        console.log('✅ 找到已保存的账户主页数据，直接加载');
        currentViewingAccount = savedProfile;
        renderAccountProfile(savedProfile);
        return;
      }

      // 如果没有保存的数据，查询账户数据
      const accountData = await queryAccountData(accountName, accountHandle, accountAvatar);

      if (!accountData) {
        showXToast('无法加载账户信息', 'error');
        return;
      }

      // 保存当前查看的账户
      currentViewingAccount = accountData;

      // 如果有完整的主页数据，直接显示
      if (accountData.tweets && accountData.tweets.length > 0) {
        renderAccountProfile(accountData);
        return;
      }

      // 否则，调用AI生成账户主页内容
      showXToast('正在生成账户主页...', 'info');
      const profileData = await generateAccountProfileContent(accountData);

      if (profileData) {
        // 更新账户数据
        currentViewingAccount = { ...accountData, ...profileData };
        renderAccountProfile(currentViewingAccount);

        // 保存到数据库
        await saveAccountProfile(currentViewingAccount);
        showXToast('账户主页已生成并保存', 'success');
      }
    } catch (error) {
      console.error('打开账户主页失败:', error);
      showXToast(`加载失败: ${error.message}`, 'error');
    }
  };

  // 查询账户数据（判断是角色/NPC/未知账户）
  async function queryAccountData(accountName, accountHandle, accountAvatar) {
    const mainDB = getDB();
    const xDB = getXDB();

    // 1. 检查是否是绑定的角色
    const allChats = await mainDB.chats.toArray();
    const allXProfiles = await xDB.xCharacterProfiles.toArray();

    for (const xProfile of allXProfiles) {
      if (xProfile.xHandle === accountHandle || xProfile.xName === accountName) {
        // 找到对应的角色数据
        const character = allChats.find(chat => chat.id === xProfile.characterId);
        if (character) {
          console.log('✅ 识别为角色账户:', accountName);
          return {
            accountType: 'character',
            name: xProfile.xName,
            handle: xProfile.xHandle,
            avatar: xProfile.xAvatar,
            verified: xProfile.xVerified || false,
            cover: xProfile.xCover || 'https://i.postimg.cc/tT8Rfsf1/mmexport1759603246385.jpg',
            bio: xProfile.xBio || '',
            publicIdentity: xProfile.publicIdentity || '',
            customTag1: xProfile.customTag1 || null,
            customTag2: xProfile.customTag2 || null,
            followingCount: xProfile.followingCount || '',
            followersCount: xProfile.followersCount || '',
            personality: character.settings.aiPersona || '',
            characterData: character,
            xProfileData: xProfile,
          };
        }
      }
    }

    // 2. 检查是否是绑定的NPC
    const npcDataId = 'xNPCs_global';
    const npcData = await xDB.xNPCs.get(npcDataId);
    const allNPCs = npcData?.npcs || [];

    for (const npc of allNPCs) {
      if (npc.handle === accountHandle || npc.name === accountName) {
        console.log('✅ 识别为NPC账户:', accountName);
        return {
          accountType: 'npc',
          name: npc.name,
          handle: npc.handle,
          avatar: npc.avatar,
          verified: false,
          cover: 'https://i.postimg.cc/tT8Rfsf1/mmexport1759603246385.jpg',
          bio: '',
          publicIdentity: '',
          customTag1: null,
          customTag2: null,
          followingCount: '',
          followersCount: '',
          personality: npc.personality || '',
          postingHabits: npc.postingHabits || '',
          homepage: npc.homepage || '',
          npcData: npc,
        };
      }
    }

    // 3. 未知账户
    console.log('⚠️ 未知账户，将根据基本信息生成:', accountName);
    return {
      accountType: 'unknown',
      name: accountName,
      handle: accountHandle,
      avatar: accountAvatar,
      verified: false,
      cover: 'https://i.postimg.cc/tT8Rfsf1/mmexport1759603246385.jpg',
      bio: '',
      publicIdentity: '',
      customTag1: null,
      customTag2: null,
      followingCount: '',
      followersCount: '',
    };
  }

  // 调用AI生成账户主页内容
  async function generateAccountProfileContent(accountData) {
    try {
      const db = getDB();
      const xDb = getXDB();

      // 获取API配置
      const apiConfig = await db.apiConfig.get('main');
      if (!apiConfig || !apiConfig.proxyUrl || !apiConfig.apiKey || !apiConfig.model) {
        showXToast('请先配置API设置', 'error');
        return null;
      }

      const { proxyUrl, apiKey, model } = apiConfig;

      // 获取X设置
      const settingsId = `xSettings_${currentAccountId || 'main'}`;
      const xSettings = await xDb.xSettings.get(settingsId);
      const userPrompt = xSettings?.systemPrompt || '';
      const worldSetting = xSettings?.worldSetting || '';

      // 构建用户X资料信息
      const userXProfileInfo = StringBuilders.buildUserXProfileInfo(window.userProfileData);

      // ▼▼▼ 构建SystemPrompt ▼▼▼
      // 1. 提示词 + 世界书
      let systemPrompt = StringBuilders.buildBaseSystemPrompt({ userPrompt, worldSetting });

      // 2. 核心任务说明
      systemPrompt += `

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 核心任务：生成账户主页内容 🎯
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
你需要为X平台账户生成主页展示内容，包括：
- 账户基本信息（若已提供则严格使用，不可修改）
- 最近发布的推文（3-5条）
- 推文下的评论互动

**生成原则**：
- 如果是已知角色账户，必须严格遵循其X资料设定
- 如果是NPC账户，必须严格遵循其人设和发帖习惯
- 如果是未知账户，根据昵称、句柄、简介进行合理推断
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;

      // 3. 目标账户信息
      systemPrompt += `

【目标账户信息】：
- X姓名：${accountData.name}
- X句柄：${accountData.handle}
- X头像：${accountData.avatar}
- 认证状态：${accountData.verified ? '是' : '否'}
${accountData.bio ? `- X简介：${accountData.bio}` : ''}
${accountData.publicIdentity ? `- 公众身份：${accountData.publicIdentity}` : ''}
${accountData.personality ? `- 人设描述：${accountData.personality}` : ''}
${accountData.postingHabits ? `- 发帖习惯：${accountData.postingHabits}` : ''}
${accountData.cover ? `- 背景图：${accountData.cover}` : ''}
${
  accountData.customTag1
    ? `- 自定义标签1：${accountData.customTag1.icon} ${accountData.customTag1.text} (${accountData.customTag1.color})`
    : ''
}
${
  accountData.customTag2
    ? `- 自定义标签2：${accountData.customTag2.icon} ${accountData.customTag2.text} (${accountData.customTag2.color})`
    : ''
}
${accountData.followingCount ? `- 正在关注：${accountData.followingCount}` : ''}
${accountData.followersCount ? `- 关注者：${accountData.followersCount}` : ''}
`;

      // 4. 账户类型特定要求
      if (accountData.accountType === 'character') {
        systemPrompt += `

【角色账户特殊要求】：
- **严格遵守**：所有已提供的X资料信息必须完全一致，不得修改
- 推文内容要符合角色人设和性格特点
- 评论互动要体现角色的社交风格
- 如有NPC关系，可在推文/评论中自然体现`;
      } else if (accountData.accountType === 'npc') {
        systemPrompt += `

【NPC账户特殊要求】：
- **严格遵守**：使用NPC的姓名、句柄、头像、人设
- 推文内容符合NPC的发帖习惯和主页内容设置
- 评论互动符合NPC的性格特点`;
      } else {
        systemPrompt += `

【未知账户生成要求】：
- 根据提供的昵称、句柄、简介推断账户特点
- 生成合理的推文内容和互动风格
- 保持账户身份的一致性`;
      }

      // 5. 用户资料约束
      systemPrompt += StringBuilders.buildUniversalConstraints(userXProfileInfo);

      // 6. JSON返回格式
      systemPrompt += `

【JSON返回格式】：
\`\`\`json
{"accountInfo": {...}, "tweets": [推文数组]}
\`\`\`

accountInfo对象结构：
- name, handle, avatar, verified (已提供的必须完全一致)
- verificationType: "verified" | "couple" (当账户有情侣关系时使用"couple"，显示心形认证图标)
- cover, bio (可补充)
- customTag1/2: {icon, text, color} (可选)
- followingCount, followersCount (可补充)

tweets数组（3-5条）：
- user: {name, handle, avatar, verified, verificationType}
- content: 推文文本
- time: 时间描述
- stats: {comments, retweets, likes, views} (纯数字)
- media: [{type:"description", description:"图片描述"}] (可选)
- comments: [评论数组] (0-3条)
- pinned: true/false (可选，第一条推文可置顶，显示"已置顶"标识)

评论对象结构：
- user: {name, handle, avatar, verified}
- content: 评论文本
- time: 时间描述

关键规则：
1. accountInfo已提供字段必须与输入完全一致，不得修改
2. 未提供字段由AI合理补充
3. verified必须是布尔值(true/false)
4. 如果该账户在角色X资料或NPC设置中标注为情侣关系，必须设置verificationType为"couple"
5. 建议将最重要或最新的一条推文设置为pinned: true（置顶）
6. stats所有数字必须是纯数字，不带引号
7. 可选字段不使用时完全省略
8. 普通用户头像：https://i.postimg.cc/4xmx7V4R/mmexport1759081128356.jpg
9. 默认背景图：https://i.postimg.cc/tT8Rfsf1/mmexport1759603246385.jpg`;
      // ▲▲▲ 构建SystemPrompt ▲▲▲

      const messages = [{ role: 'user', content: `请生成账户 ${accountData.name} (${accountData.handle}) 的主页内容` }];

      // 判断API类型并发送请求
      let isGemini = proxyUrl.includes('generativelanguage');
      let response;

      if (isGemini) {
        const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models';
        const geminiConfig = {
          url: `${GEMINI_API_URL}/${model}:generateContent?key=${getRandomValue(apiKey)}`,
          data: {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: systemPrompt + '\n\n' + messages.map(m => m.content).join('\n'),
                    },
                  ],
                },
              ],
              generationConfig: {
                temperature: 0.7,
              },
            }),
          },
        };
        response = await fetch(geminiConfig.url, geminiConfig.data);
      } else {
        const openAiPayload = {
          model: model,
          messages: [{ role: 'system', content: systemPrompt }, ...messages],
          temperature: 0.7,
          stream: false,
        };
        response = await fetch(`${proxyUrl}/v1/chat/completions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify(openAiPayload),
        });
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API错误: ${response.status} - ${errorData.error?.message || response.statusText}`);
      }

      const data = await response.json();
      let aiResponseContent;

      if (isGemini) {
        aiResponseContent = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      } else {
        aiResponseContent = data.choices?.[0]?.message?.content || '';
      }

      console.log('AI原始响应:', aiResponseContent);

      // 解析AI返回的JSON数据
      const cleanedResponse = aiResponseContent
        .replace(/```json\s*/i, '')
        .replace(/```\s*$/, '')
        .trim();

      if (!cleanedResponse) {
        throw new Error('AI返回了空的响应内容');
      }

      let profileData;
      try {
        profileData = JSON.parse(cleanedResponse);
      } catch (parseError) {
        console.error('JSON解析失败:', parseError);
        console.error('尝试解析的内容:', cleanedResponse.substring(0, 500) + '...');
        throw new Error(`AI返回的数据不是有效的JSON格式: ${parseError.message}`);
      }

      // 验证数据格式
      if (!profileData.accountInfo || !profileData.tweets) {
        throw new Error('AI返回的数据格式不正确');
      }

      showXToast('账户主页已生成', 'success');
      return profileData;
    } catch (error) {
      console.error('生成账户主页内容失败:', error);
      showXToast(`生成失败: ${error.message}`, 'error');
      return null;
    }
  }

  // 渲染账户主页
  function renderAccountProfile(accountData) {
    console.log('渲染账户主页:', accountData);

    // 填充账户信息
    const accountInfo = accountData.accountInfo || accountData;

    // 设置导航栏标题和推文数
    document.getElementById('account-profile-nav-name').textContent = accountInfo.name || accountData.name;
    const tweetCount = (accountData.tweets && accountData.tweets.length) || 0;
    document.getElementById('account-profile-nav-count').textContent = `${DataUtils.formatNumber(tweetCount)} 个帖子`;

    // 设置背景图
    const coverImage = document.getElementById('account-cover-image');
    coverImage.style.backgroundImage = `url('${
      accountInfo.cover || accountData.cover || 'https://i.postimg.cc/tT8Rfsf1/mmexport1759603246385.jpg'
    }')`;

    // 设置头像
    document.getElementById('account-avatar-image').src = accountInfo.avatar || accountData.avatar;

    // 设置名称
    document.getElementById('account-display-name').textContent = accountInfo.name || accountData.name;

    // 设置认证徽章（根据认证类型显示不同图标）
    const verifiedBadge = document.getElementById('account-verified-badge');
    const verificationType = accountInfo.verificationType || accountData.verificationType || 'verified';

    if (accountInfo.verified || accountData.verified) {
      // 情侣认证使用心形图标
      if (verificationType === 'couple') {
        verifiedBadge.innerHTML = `
          <svg viewBox="0 0 24 24" style="width: 20px; height: 20px; fill: #fff;">
            <g><path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path></g>
          </svg>
        `;
      } else {
        // 默认蓝色勾标
        verifiedBadge.innerHTML = `
          <svg viewBox="0 0 24 24" style="width: 20px; height: 20px; fill: #1d9bf0;">
            <g><path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.27 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.46 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z"></path></g>
          </svg>
        `;
      }
      verifiedBadge.style.display = 'inline-flex';
      verifiedBadge.style.alignItems = 'center';
    } else {
      verifiedBadge.style.display = 'none';
    }

    // 设置句柄（添加@前缀）
    const handle = accountInfo.handle || accountData.handle;
    document.getElementById('account-handle-text').textContent = handle.startsWith('@') ? handle : `@${handle}`;

    // 设置简介
    const bioElement = document.getElementById('account-bio-text');
    if (accountInfo.bio || accountData.bio) {
      bioElement.textContent = accountInfo.bio || accountData.bio;
      bioElement.style.display = 'block';
    } else {
      bioElement.style.display = 'none';
    }

    // 设置自定义标签
    const tagsContainer = document.getElementById('account-tags-container');
    tagsContainer.innerHTML = '';

    const customTag1 = accountInfo.customTag1 || accountData.customTag1;
    const customTag2 = accountInfo.customTag2 || accountData.customTag2;

    if (customTag1 && customTag1.text) {
      const tag1 = document.createElement('div');
      tag1.style.cssText = `display: flex; align-items: center; gap: 4px; color: ${
        customTag1.color || '#71767b'
      }; font-size: 15px;`;
      tag1.innerHTML = `<span>${customTag1.icon || ''}</span><span>${customTag1.text}</span>`;
      tagsContainer.appendChild(tag1);
    }

    if (customTag2 && customTag2.text) {
      const tag2 = document.createElement('div');
      tag2.style.cssText = `display: flex; align-items: center; gap: 4px; color: ${
        customTag2.color || '#71767b'
      }; font-size: 15px;`;
      tag2.innerHTML = `<span>${customTag2.icon || ''}</span><span>${customTag2.text}</span>`;
      tagsContainer.appendChild(tag2);
    }

    // 设置关注数据
    document.getElementById('account-following-count').textContent =
      accountInfo.followingCount || accountData.followingCount || '0';
    document.getElementById('account-followers-count').textContent =
      accountInfo.followersCount || accountData.followersCount || '0';

    // 渲染推文
    const tweetsContainer = document.getElementById('account-tweets-container');
    tweetsContainer.innerHTML = '';

    if (accountData.tweets && accountData.tweets.length > 0) {
      accountData.tweets.forEach(tweet => {
        const tweetElement = createAccountTweetElement(tweet, accountInfo);
        tweetsContainer.appendChild(tweetElement);
      });
    } else {
      tweetsContainer.innerHTML =
        '<div style="padding: 40px; text-align: center; color: #71767b;">该账户还没有发布推文</div>';
    }

    // 显示账户主页
    document.querySelectorAll('.x-page').forEach(page => (page.style.display = 'none'));
    document.getElementById('account-profile-page').style.display = 'flex';

    showXToast(`已加载 ${accountInfo.name || accountData.name} 的主页`, 'success');
  }

  // 创建账户推文元素（按图片样式设计）
  function createAccountTweetElement(tweet, accountInfo) {
    const tweetEl = document.createElement('div');
    tweetEl.style.cssText = 'border-bottom: 1px solid #2f3336;';

    const user = tweet.user || accountInfo;
    const isPinned = tweet.pinned || false;

    // 构建认证图标HTML
    let verifiedBadgeHtml = '';
    if (user.verified) {
      if (user.verificationType === 'couple') {
        verifiedBadgeHtml =
          '<svg viewBox="0 0 24 24" style="width: 18px; height: 18px; fill: #fff;"><g><path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path></g></svg>';
      } else {
        verifiedBadgeHtml =
          '<svg viewBox="0 0 24 24" style="width: 18px; height: 18px; fill: #1d9bf0;"><g><path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.27 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.46 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z"></path></g></svg>';
      }
    }

    tweetEl.innerHTML = `
      ${
        isPinned
          ? `
        <div style="padding: 12px 16px 0; display: flex; align-items: center; gap: 12px;">
          <div style="width: 40px; display: flex; justify-content: flex-end;">
            <svg viewBox="0 0 32 32" style="width: 16px; height: 16px; fill: #71767b;">
              <path d="M20.743 14.815l-0.933-12.065h5.191c0.414 0 0.75-0.336 0.75-0.75s-0.336-0.75-0.75-0.75v0h-18c-0.414 0-0.75 0.336-0.75 0.75s0.336 0.75 0.75 0.75v0h5.432l-1.275 12.103c-3.213 0.959-5.574 3.738-5.904 7.113l-0.003 0.034c0 0.414 0.336 0.75 0.75 0.75h9.25v7.25c0 0.414 0.336 0.75 0.75 0.75s0.75-0.336 0.75-0.75v0-7.25h9.25c0.414-0 0.75-0.336 0.75-0.75v0c0-3.017-2.35-5.787-6.007-7.185zM12.104 16.081c0.096-0.035 0.179-0.085 0.249-0.148l-0.001 0.001 0.005-0.003c0.126-0.117 0.211-0.275 0.233-0.453l0-0.004 0.011-0.022 1.337-12.701h4.367l0.979 12.681c0.033 0.35 0.303 0.627 0.647 0.67l0.004 0c2.542 0.682 4.512 2.623 5.222 5.096l0.013 0.052h-18.341c0.729-2.54 2.714-4.49 5.222-5.157l0.052-0.012z"></path>
            </svg>
          </div>
          <span style="color: #71767b; font-size: 13px; font-weight: 700;">已置顶</span>
        </div>
      `
          : ''
      }
      <div style="padding: 12px 16px; display: flex; gap: 12px; position: relative;">
        <img src="${user.avatar}" alt="${
      user.name
    }" style="width: 40px; height: 40px; border-radius: 50%; flex-shrink: 0;">
        <div style="flex: 1; min-width: 0;">
          <div style="display: flex; align-items: center; gap: 2px; margin-bottom: 2px; flex-wrap: wrap;">
            <span style="color: #fff; font-weight: 800; font-size: 15px;">${user.name}</span>
            ${verifiedBadgeHtml}
            <span style="color: #71767b; font-size: 15px; margin-left: 4px;">${
              user.handle.startsWith('@') ? user.handle : '@' + user.handle
            }</span>
            <span style="color: #71767b; font-size: 15px; margin: 0 4px;">·</span>
            <span style="color: #71767b; font-size: 15px;">${tweet.time}</span>
          </div>
          <div style="color: #fff; font-size: 15px; line-height: 20px; margin-bottom: 12px; word-wrap: break-word;">${processContent(
            tweet.content,
          )}</div>
          ${
            tweet.media && tweet.media.length > 0
              ? `
            <div style="background-color: #202327; border-radius: 16px; padding: 12px; margin-bottom: 12px; border: 1px solid #2f3336;">
              <div style="color: #e7e9ea; font-size: 15px; line-height: 20px;">${tweet.media[0].description}</div>
            </div>
          `
              : ''
          }
          <div style="display: flex; justify-content: space-between; max-width: 425px; margin-top: 12px;">
            <div style="display: flex; align-items: center; gap: 4px; color: #71767b; cursor: pointer; padding: 0;" onmouseover="this.style.color='#1d9bf0'" onmouseout="this.style.color='#71767b'">
              <svg viewBox="0 0 24 24" style="width: 18px; height: 18px; fill: currentColor;"><g><path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"></path></g></svg>
              <span style="font-size: 13px;">${DataUtils.formatNumber(tweet.stats.comments || 0)}</span>
            </div>
            <div style="display: flex; align-items: center; gap: 4px; color: #71767b; cursor: pointer; padding: 0;" onmouseover="this.style.color='#00ba7c'" onmouseout="this.style.color='#71767b'">
              <svg viewBox="0 0 24 24" style="width: 18px; height: 18px; fill: currentColor;"><g><path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"></path></g></svg>
              <span style="font-size: 13px;">${DataUtils.formatNumber(tweet.stats.retweets || 0)}</span>
            </div>
            <div style="display: flex; align-items: center; gap: 4px; color: #71767b; cursor: pointer; padding: 0;" onmouseover="this.style.color='#f91880'" onmouseout="this.style.color='#71767b'">
              <svg viewBox="0 0 24 24" style="width: 18px; height: 18px; fill: currentColor;"><g><path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path></g></svg>
              <span style="font-size: 13px;">${DataUtils.formatNumber(tweet.stats.likes || 0)}</span>
            </div>
            <div style="display: flex; align-items: center; gap: 4px; color: #71767b; cursor: pointer; padding: 0;" onmouseover="this.style.color='#1d9bf0'" onmouseout="this.style.color='#71767b'">
              <svg viewBox="0 0 24 24" style="width: 18px; height: 18px; fill: currentColor;"><g><path d="M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z"></path></g></svg>
              <span style="font-size: 13px;">${DataUtils.formatNumber(tweet.stats.views || 0)}</span>
            </div>
            <div style="display: flex; align-items: center; gap: 8px; color: #71767b; cursor: pointer; padding: 0;">
              <div style="display: flex; align-items: center;" onmouseover="this.style.color='#1d9bf0'" onmouseout="this.style.color='#71767b'">
                <svg viewBox="0 0 24 24" style="width: 18px; height: 18px; fill: currentColor;"><g><path d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5zM6.5 4c-.276 0-.5.22-.5.5v14.56l6-4.29 6 4.29V4.5c0-.28-.224-.5-.5-.5h-11z"></path></g></svg>
              </div>
              <div style="display: flex; align-items: center;" onmouseover="this.style.color='#1d9bf0'" onmouseout="this.style.color='#71767b'">
                <svg viewBox="0 0 24 24" style="width: 18px; height: 18px; fill: currentColor;"><g><path d="M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.3 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z"></path></g></svg>
              </div>
            </div>
          </div>
        </div>
        <!-- 右上角三点菜单 -->
        <div style="position: absolute; top: 12px; right: 16px; cursor: pointer; padding: 4px; border-radius: 50%; transition: background-color 0.2s;" onmouseover="this.style.backgroundColor='rgba(29,155,240,0.1)'" onmouseout="this.style.backgroundColor='transparent'">
          <svg viewBox="0 0 24 24" style="width: 18px; height: 18px; fill: #71767b;">
            <g><path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path></g>
          </svg>
        </div>
      </div>
    `;

    return tweetEl;
  }

  // 关闭账户主页
  window.closeAccountProfile = function () {
    document.getElementById('account-profile-page').style.display = 'none';
    document.getElementById('x-home-page').style.display = 'flex';
  };

  // 切换关注状态
  window.toggleAccountFollow = function () {
    const followBtn = document.getElementById('account-follow-btn');
    const notifyBtn = document.getElementById('account-notify-btn');

    if (followBtn.textContent === '关注') {
      // 关注账户
      followBtn.textContent = '正在关注';
      followBtn.style.backgroundColor = '#000';
      followBtn.style.color = '#fff';
      followBtn.style.border = '1px solid #536471';
      notifyBtn.style.display = 'flex';
      showXToast('已关注该账户', 'success');
    } else {
      // 取消关注
      followBtn.textContent = '关注';
      followBtn.style.backgroundColor = '#fff';
      followBtn.style.color = '#000';
      followBtn.style.border = 'none';
      notifyBtn.style.display = 'none';
      showXToast('已取消关注', 'info');
    }
  };

  // 切换通知设置
  window.toggleAccountNotifications = function () {
    showXToast('通知设置已更新', 'success');
  };

  // 发送私信
  window.sendMessageToAccount = function () {
    showXToast('私信功能开发中...', 'info');
  };

  // 切换账户标签
  window.switchAccountTab = function (tabName) {
    // 更新标签样式
    const tabs = document.querySelectorAll('.account-tab');
    tabs.forEach(tab => {
      if (tab.onclick.toString().includes(tabName)) {
        tab.style.fontWeight = '700';
        tab.style.color = '#fff';
        tab.style.borderBottom = '4px solid #1d9bf0';
      } else {
        tab.style.fontWeight = '500';
        tab.style.color = '#71767b';
        tab.style.borderBottom = '4px solid transparent';
      }
    });

    // 目前只有帖子标签有内容，其他标签显示占位符
    if (tabName !== 'posts') {
      const tweetsContainer = document.getElementById('account-tweets-container');
      const tabNameMap = {
        replies: '回复',
        highlights: '亮点',
        media: '媒体',
      };
      tweetsContainer.innerHTML = `
        <div style="padding: 60px 32px; text-align: center;">
          <div style="color: #71767b; font-size: 31px; font-weight: 800; margin-bottom: 8px;">还没有${tabNameMap[tabName]}</div>
          <div style="color: #71767b; font-size: 15px;">该账户的${tabNameMap[tabName]}内容会显示在这里。</div>
        </div>
      `;
    } else {
      // 重新渲染推文
      if (currentViewingAccount && currentViewingAccount.tweets) {
        const tweetsContainer = document.getElementById('account-tweets-container');
        tweetsContainer.innerHTML = '';
        const accountInfo = currentViewingAccount.accountInfo || currentViewingAccount;
        currentViewingAccount.tweets.forEach(tweet => {
          const tweetElement = createAccountTweetElement(tweet, accountInfo);
          tweetsContainer.appendChild(tweetElement);
        });
      }
    }
  };

  // 保存账户主页数据到数据库
  async function saveAccountProfile(accountData) {
    try {
      const xDB = getXDB();
      const cleanHandle = accountData.accountInfo.handle.replace('@', '');

      // 准备保存的数据
      const profileToSave = {
        handle: cleanHandle,
        name: accountData.accountInfo.name,
        accountInfo: accountData.accountInfo,
        tweets: accountData.tweets || [],
        updatedAt: new Date().toISOString(),
      };

      await xDB.xAccountProfiles.put(profileToSave);
      console.log('✅ 账户主页数据已保存:', cleanHandle);
    } catch (error) {
      console.error('保存账户主页数据失败:', error);
    }
  }

  // 刷新账户主页（重新生成）
  window.refreshAccountProfile = async function () {
    if (!currentViewingAccount) {
      showXToast('未找到当前账户信息', 'error');
      return;
    }

    try {
      showXToast('正在重新生成账户主页...', 'info');

      // 从当前账户数据中提取基本信息
      const accountInfo = currentViewingAccount.accountInfo || currentViewingAccount;

      // 查询账户数据（重新判断账户类型）
      const accountData = await queryAccountData(accountInfo.name, accountInfo.handle, accountInfo.avatar);

      if (!accountData) {
        showXToast('无法加载账户信息', 'error');
        return;
      }

      // 调用AI重新生成账户主页内容
      const profileData = await generateAccountProfileContent(accountData);

      if (profileData) {
        // 更新账户数据
        currentViewingAccount = { ...accountData, ...profileData };
        renderAccountProfile(currentViewingAccount);

        // 保存到数据库（覆盖旧数据）
        await saveAccountProfile(currentViewingAccount);
        showXToast('账户主页已刷新', 'success');
      }
    } catch (error) {
      console.error('刷新账户主页失败:', error);
      showXToast(`刷新失败: ${error.message}`, 'error');
    }
  };
  // ▲▲▲ 【主要！！！】第七个情景：账户主页生成器 ▲▲▲

  // ============================================
  // 账户提问箱功能
  // ============================================

  // 账户提问箱数据（临时存储）
  let accountAskboxData = {
    avatar: 'https://i.postimg.cc/4xmx7V4R/mmexport1759081128356.jpg',
    nickname: '⩌⌯⩌',
    prompt: '请向我匿名提问!waiting...',
    background: 'https://i.postimg.cc/tJvBC00j/mmexport1759642131681.jpg',
    answeredQuestions: [],
  };

  // 账户提问箱多选删除相关变量
  let isAccountAskboxMultiSelectMode = false;
  let selectedAccountQuestions = new Set();
  let accountQuestionLongPressTimer = null;

  // 打开账户提问箱
  window.openAccountAskbox = async function () {
    if (!currentViewingAccount) {
      showXToast('未找到当前账户信息', 'error');
      return;
    }

    try {
      // 加载该账户的提问箱数据
      await loadAccountAskboxData();

      // 隐藏账户主页，显示提问箱页面
      document.getElementById('account-profile-page').style.display = 'none';
      document.getElementById('account-askbox-page').style.display = 'flex';
    } catch (error) {
      console.error('打开账户提问箱失败:', error);
      showXToast('打开提问箱失败: ' + error.message, 'error');
    }
  };

  // 关闭账户提问箱
  window.closeAccountAskbox = function () {
    // 退出多选模式
    if (isAccountAskboxMultiSelectMode) {
      exitAccountAskboxMultiSelectMode();
    }

    document.getElementById('account-askbox-page').style.display = 'none';
    document.getElementById('account-profile-page').style.display = 'flex';
  };

  // 从数据库加载账户提问箱数据
  async function loadAccountAskboxDataFromDB() {
    try {
      const xDb = getXDB();
      const accountInfo = currentViewingAccount.accountInfo || currentViewingAccount;
      const accountHandle = accountInfo.handle.replace('@', '');
      const askboxId = `account_askbox_${accountHandle}`;

      const savedData = await xDb.xAccountAskbox.get(askboxId);

      if (savedData) {
        // 从数据库加载
        Object.assign(accountAskboxData, savedData);
        console.log('✅ 账户提问箱数据已从数据库加载:', accountHandle);
      } else {
        // 使用默认数据并保存到数据库
        // 默认提示词使用用户的提示词
        const userPrompt = askboxData.prompt;
        accountAskboxData = {
          avatar: 'https://i.postimg.cc/4xmx7V4R/mmexport1759081128356.jpg',
          nickname: '⩌⌯⩌',
          prompt: userPrompt,
          background: 'https://i.postimg.cc/tJvBC00j/mmexport1759642131681.jpg',
          answeredQuestions: [],
          id: askboxId,
        };
        await xDb.xAccountAskbox.put(accountAskboxData);
        console.log('✅ 已创建默认账户提问箱数据:', accountHandle);
      }
    } catch (error) {
      console.error('❌ 加载账户提问箱数据失败:', error);
    }
  }

  // 保存账户提问箱数据到数据库
  async function saveAccountAskboxDataToDB() {
    try {
      const xDb = getXDB();
      const accountInfo = currentViewingAccount.accountInfo || currentViewingAccount;
      const accountHandle = accountInfo.handle.replace('@', '');
      const askboxId = `account_askbox_${accountHandle}`;

      accountAskboxData.id = askboxId;
      await xDb.xAccountAskbox.put(accountAskboxData);
      console.log('✅ 账户提问箱数据已保存到数据库:', accountHandle);
    } catch (error) {
      console.error('❌ 保存账户提问箱数据失败:', error);
    }
  }

  // 加载账户提问箱数据到UI
  async function loadAccountAskboxData() {
    // 从数据库加载
    await loadAccountAskboxDataFromDB();

    // 更新UI
    const avatarEl = document.getElementById('account-askbox-avatar');
    const nicknameEl = document.getElementById('account-askbox-nickname');
    const promptEl = document.getElementById('account-askbox-prompt');
    const backgroundEl = document.getElementById('account-askbox-background');

    if (avatarEl) avatarEl.src = accountAskboxData.avatar;
    if (nicknameEl) nicknameEl.textContent = accountAskboxData.nickname;
    if (promptEl) promptEl.textContent = accountAskboxData.prompt;
    if (backgroundEl) backgroundEl.style.backgroundImage = `url('${accountAskboxData.background}')`;

    // 渲染已回答的提问列表
    renderAccountAnsweredQuestions();
  }

  // 修改账户提问箱头像
  window.changeAccountAskboxAvatar = async function () {
    const newAvatar = prompt('请输入新的头像URL:', accountAskboxData.avatar);
    if (newAvatar && newAvatar.trim()) {
      accountAskboxData.avatar = newAvatar.trim();
      const avatarEl = document.getElementById('account-askbox-avatar');
      if (avatarEl) avatarEl.src = accountAskboxData.avatar;

      // 保存到数据库
      await saveAccountAskboxDataToDB();
      showXToast('头像已更新并保存', 'success');
    }
  };

  // 保存账户提问箱昵称（原处编辑）
  window.saveAccountAskboxNickname = async function () {
    const nicknameEl = document.getElementById('account-askbox-nickname');
    if (!nicknameEl) return;

    const newNickname = nicknameEl.textContent.trim();
    if (newNickname && newNickname !== accountAskboxData.nickname) {
      accountAskboxData.nickname = newNickname;
      await saveAccountAskboxDataToDB();
      console.log('✅ 昵称已自动保存:', newNickname);
    }
  };

  // 保存账户提问卡片文字（原处编辑）
  window.saveAccountAskboxPrompt = async function () {
    const promptEl = document.getElementById('account-askbox-prompt');
    if (!promptEl) return;

    const newPrompt = promptEl.textContent.trim();
    if (newPrompt && newPrompt !== accountAskboxData.prompt) {
      accountAskboxData.prompt = newPrompt;
      await saveAccountAskboxDataToDB();
      console.log('✅ 提示文字已自动保存:', newPrompt);
    }
  };

  // 打开账户提问箱设置
  window.openAccountAskboxSettings = function () {
    const newBackground = prompt('请输入新的背景图URL:', accountAskboxData.background);
    if (newBackground && newBackground.trim()) {
      accountAskboxData.background = newBackground.trim();
      const backgroundEl = document.getElementById('account-askbox-background');
      if (backgroundEl) backgroundEl.style.backgroundImage = `url('${accountAskboxData.background}')`;

      // 保存到数据库
      saveAccountAskboxDataToDB();
      showXToast('背景图已更新并保存', 'success');
    }
  };

  // 获取新的提问（账户提问箱AI生成）
  window.getNewAccountQuestion = async function () {
    if (!currentViewingAccount) {
      showXToast('未找到当前账户信息', 'error');
      return;
    }

    try {
      showXToast('正在生成新的提问...', 'info');

      // 从数据库读取API配置和X设置
      const db = getDB();
      const xDb = getXDB();

      const apiConfig = await db.apiConfig.get('main');
      if (!apiConfig || !apiConfig.proxyUrl || !apiConfig.apiKey || !apiConfig.model) {
        showXToast('请先配置API设置', 'error');
        return;
      }

      const { proxyUrl, apiKey, model } = apiConfig;

      // 从X设置中读取配置（按账号读取）
      const settingsId = `xSettings_${currentAccountId || 'main'}`;
      const xSettings = await xDb.xSettings.get(settingsId);
      const userPrompt = xSettings?.systemPrompt || '';
      const worldSetting = xSettings?.worldSetting || '';

      // 获取账户信息
      const accountInfo = currentViewingAccount.accountInfo || currentViewingAccount;
      const accountHandle = accountInfo.handle.replace('@', '');

      // 查询该账户是否是角色或NPC
      const accountData = await queryAccountData(accountInfo.name, accountInfo.handle, accountInfo.avatar);

      // 构建角色/账户的详细信息
      let accountDetailInfo = '';
      let accountPersona = '';

      if (accountData.type === 'character' && accountData.characterData) {
        // 是角色账户
        const charData = accountData.characterData;
        accountDetailInfo = `
【账户类型】：角色账户

【角色X资料】：
- X姓名：${charData.xName}
- X句柄：${charData.xHandle}
- X简介：${charData.xBio || '无'}
- 公众身份：${charData.publicIdentity || '无'}
- 认证状态：${charData.verified ? '已认证' : '未认证'}
- 真实姓名：${charData.showRealName && charData.realName ? charData.realName : '未公开'}
`;

        // 获取角色人设
        const mainDB = getDB();
        const characterChat = await mainDB.chats.get(charData.characterId);
        if (characterChat && characterChat.settings.aiPersona) {
          accountPersona = `\n【角色人设】：\n${characterChat.settings.aiPersona}`;
        }

        // 获取角色的NPC关系
        if (charData.npcRelationships && charData.npcRelationships.length > 0) {
          accountDetailInfo += '\n【角色的NPC关系】：\n';
          for (const rel of charData.npcRelationships) {
            accountDetailInfo += `- ${rel.npcName}（${rel.npcHandle}）: ${rel.relationType} - ${rel.description}\n`;
          }
        }
      } else if (accountData.type === 'npc' && accountData.npcData) {
        // 是NPC账户
        const npcData = accountData.npcData;
        accountDetailInfo = `
【账户类型】：NPC账户

【NPC基本信息】：
- NPC姓名：${npcData.name}
- NPC句柄：${npcData.handle}
- 头像：${npcData.avatar}
`;

        if (npcData.personality) {
          accountPersona = `\n【NPC人设】：\n${npcData.personality}`;
        }

        if (npcData.postingHabits) {
          accountDetailInfo += `\n【发帖习惯】：\n${npcData.postingHabits}`;
        }

        if (npcData.homepage) {
          accountDetailInfo += `\n【主页内容】：\n${npcData.homepage}`;
        }
      } else {
        // 未知账户
        accountDetailInfo = `
【账户类型】：未知账户

【账户基本信息】：
- 名称：${accountInfo.name}
- 句柄：${accountInfo.handle}
- 简介：${accountInfo.bio || '无'}
`;
      }

      // 获取该账户已有的推文（如果有）
      let accountTweetsInfo = '';
      if (currentViewingAccount.tweets && currentViewingAccount.tweets.length > 0) {
        accountTweetsInfo = `\n【该账户最近发布的推文】：\n`;
        currentViewingAccount.tweets.slice(0, 5).forEach((tweet, i) => {
          accountTweetsInfo += `${i + 1}. ${tweet.content}${tweet.time ? ` (${tweet.time})` : ''}\n`;
        });
      }

      // 获取用户的X资料（提问者的身份信息）
      const userXProfileInfo = StringBuilders.buildUserXProfileInfo(window.userProfileData);

      // 获取情侣角色的X资料
      let coupleCharacterInfo = '';
      if (accountData.type === 'character' && accountData.characterData) {
        const charData = accountData.characterData;
        // 检查角色是否有情侣关系
        if (charData.npcRelationships) {
          const coupleRelation = charData.npcRelationships.find(rel => rel.relationType === '恋人');
          if (coupleRelation) {
            coupleCharacterInfo = `\n【该角色的情侣关系】：\n与 ${coupleRelation.npcName}（${coupleRelation.npcHandle}）是恋人关系\n${coupleRelation.description}`;
          }
        }
      }

      // 收集已有的提问（如果要重新生成）
      let existingQuestionsContext = '';
      if (accountAskboxData.answeredQuestions.length > 0) {
        existingQuestionsContext = `\n【已有的提问列表（需要重新生成回答）】：\n`;
        accountAskboxData.answeredQuestions.forEach((q, i) => {
          existingQuestionsContext += `${i + 1}. ${q.question}\n`;
        });
      }

      // 构建系统提示词
      let systemPrompt = StringBuilders.buildBaseSystemPrompt({
        userPrompt,
        worldSetting,
      });

      systemPrompt += `

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 核心任务说明 - 账户提问箱生成 🎯
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
你需要为该账户生成匿名提问，并以该账户的身份回答这些提问。

${accountDetailInfo}
${accountPersona}
${accountTweetsInfo}
${coupleCharacterInfo}

【提问者背景信息（参考）】：
- 用户名：${userXProfileInfo.name}
- X句柄：${userXProfileInfo.handle}
- 简介：${userXProfileInfo.bio || '无'}
${existingQuestionsContext}

【生成要求】：
1. ${existingQuestionsContext ? '如果有已有提问列表，请基于这些提问重新生成回答' : '生成3-10个适合该账户身份的匿名提问'}
2. 提问要自然、真实，符合匿名提问箱的风格
3. 提问内容要与账户的身份、简介、公众身份、最近发布的推文相关
4. ${
        accountData.type === 'character' || accountData.type === 'npc'
          ? '回答必须严格符合角色/NPC的人设和性格特点'
          : '回答要自然、真实'
      }
5. 提问可以是：
   - 关于最近推文内容的追问或评论
   - 关于生活经验、情感态度的询问
   - 关于兴趣爱好、日常生活的好奇
   - 轻松幽默或真诚的话题
6. 提问长度适中（10-50字）
7. 回答要体现该账户的性格和口吻，长度适中（20-100字）
8. 避免过于私密、冒犯或不适当的问题

【返回格式】：
返回JSON数组，每个对象包含question和answer字段：

\`\`\`json
[
  {"question": "提问内容1", "answer": "该账户的回答1"},
  {"question": "提问内容2", "answer": "该账户的回答2"},
  {"question": "提问内容3", "answer": "该账户的回答3"}
]
\`\`\`

【重要】：
- 必须返回有效的JSON数组格式
- question是匿名提问的内容
- answer是该账户以自己的身份和人设回答的内容
- ${
        existingQuestionsContext
          ? `请基于已有的${accountAskboxData.answeredQuestions.length}个提问重新生成回答`
          : '生成3-10组问答'
      }

现在，请生成JSON格式的问答内容：`;

      const messages = [
        {
          role: 'user',
          content: existingQuestionsContext
            ? `请基于已有的${accountAskboxData.answeredQuestions.length}个提问，以该账户的身份重新生成回答，返回JSON数组格式`
            : '请生成3-10组问答，返回JSON数组格式',
        },
      ];

      // 判断API类型并发送请求
      let isGemini = proxyUrl.includes('generativelanguage');
      let response;

      if (isGemini) {
        const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models';
        const geminiConfig = {
          url: `${GEMINI_API_URL}/${model}:generateContent?key=${getRandomValue(apiKey)}`,
          data: {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: systemPrompt + '\n\n' + messages.map(m => m.content).join('\n'),
                    },
                  ],
                },
              ],
              generationConfig: {
                temperature: 0.9,
              },
            }),
          },
        };
        response = await fetch(geminiConfig.url, geminiConfig.data);
      } else {
        const openAiPayload = {
          model: model,
          messages: [{ role: 'system', content: systemPrompt }, ...messages],
          temperature: 0.9,
          stream: false,
        };
        response = await fetch(`${proxyUrl}/v1/chat/completions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify(openAiPayload),
        });
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API错误: ${response.status} - ${errorData.error?.message || response.statusText}`);
      }

      const data = await response.json();
      let aiResponseContent;

      if (isGemini) {
        // Gemini格式
        if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) {
          aiResponseContent = data.candidates[0].content.parts[0].text || '';
        }
      } else {
        // OpenAI格式
        aiResponseContent = data.choices?.[0]?.message?.content || '';
      }

      console.log('AI生成的问答:', aiResponseContent);

      // 解析JSON格式的回答
      let qaArray;
      try {
        // 提取JSON内容（可能被包裹在```json```中）
        let jsonText = aiResponseContent.trim();
        const jsonMatch = jsonText.match(/```(?:json)?\s*(\[\s*\{[\s\S]*?\}\s*\])\s*```/);
        if (jsonMatch) {
          jsonText = jsonMatch[1];
        } else if (jsonText.startsWith('[') && jsonText.endsWith(']')) {
          // 直接是JSON数组
          jsonText = jsonText;
        } else {
          throw new Error('未找到有效的JSON格式');
        }

        qaArray = JSON.parse(jsonText);

        if (!Array.isArray(qaArray) || qaArray.length === 0) {
          throw new Error('AI返回的不是有效的数组或数组为空');
        }
      } catch (parseError) {
        console.error('JSON解析失败:', parseError);
        throw new Error(`解析AI回答失败: ${parseError.message}`);
      }

      console.log(`✅ 解析到 ${qaArray.length} 组问答:`, qaArray);

      // 如果是重新生成，清空原有提问
      if (existingQuestionsContext) {
        accountAskboxData.answeredQuestions = [];
      }

      // 为每个问答创建对象并添加到数组
      const newQuestions = qaArray.map((qa, index) => ({
        id: `q_${Date.now()}_${index}_${Math.random().toString(36).substr(2, 9)}`,
        question: qa.question || '',
        answer: qa.answer || '',
        date: new Date().toISOString(),
      }));

      // 批量添加到最前面
      accountAskboxData.answeredQuestions.unshift(...newQuestions);

      // 保存到数据库
      await saveAccountAskboxDataToDB();

      // 重新渲染提问列表
      renderAccountAnsweredQuestions();

      showXToast(`${existingQuestionsContext ? '已重新生成回答' : `生成了 ${newQuestions.length} 组问答`}`, 'success');
    } catch (error) {
      console.error('生成提问失败:', error);
      showXToast(`生成失败: ${error.message}`, 'error');
    }
  };

  // 渲染账户已回答的提问列表
  function renderAccountAnsweredQuestions() {
    const container = document.getElementById('account-answered-questions-list');
    const titleEl = document.getElementById('account-answered-questions-title');
    if (!container) return;

    if (accountAskboxData.answeredQuestions.length === 0) {
      // 隐藏标题
      if (titleEl) titleEl.style.display = 'none';

      container.innerHTML = `
        <div style="
          text-align: center;
          color: rgba(255,255,255,0.6);
          font-size: 14px;
          padding: 40px 20px;
        ">
          暂无提问
        </div>
      `;
      return;
    }

    // 显示标题
    if (titleEl) titleEl.style.display = 'block';

    container.innerHTML = accountAskboxData.answeredQuestions
      .map((q, index) => {
        const date = new Date(q.date);
        const dateStr = date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' });
        const isSelected = selectedAccountQuestions.has(q.id);

        return `
      <div 
        class="account-askbox-question-item"
        data-question-id="${q.id}"
        style="
        background-color: rgba(255,255,255,0.9);
        backdrop-filter: blur(10px);
        border-radius: 16px;
        overflow: hidden;
        margin-bottom: 16px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transition: all 0.2s;
        ${isSelected ? 'border: 3px solid #1d9bf0; background-color: rgba(29, 155, 240, 0.1);' : ''}
        ${isAccountAskboxMultiSelectMode ? 'border-left: 3px solid #1d9bf0;' : ''}
      " 
      onmouseover="if(!${isAccountAskboxMultiSelectMode}){this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 16px rgba(0,0,0,0.2)';}"
      onmouseout="if(!${isAccountAskboxMultiSelectMode}){this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.15)';}"
      onmousedown="startAccountQuestionLongPress('${q.id}')"
      onmouseup="endAccountQuestionLongPress()"
      onmouseleave="endAccountQuestionLongPress()"
      ontouchstart="startAccountQuestionLongPress('${q.id}')"
      ontouchend="endAccountQuestionLongPress()"
      onclick="if(${isAccountAskboxMultiSelectMode}){toggleAccountQuestionSelection('${
          q.id
        }');event.stopPropagation();}"
      >
        <!-- 提问区域（浅黑灰色） -->
        <div style="
          background: linear-gradient(135deg, #3a3a3a 0%, #2a2a2a 100%);
          padding: 20px;
          color: #fff;
        ">
          <div style="font-size: 15px; line-height: 1.6; word-break: break-word;">
            ${q.question}
          </div>
        </div>
        
        <!-- 回复区域（白色，可编辑） -->
        <div style="
          background-color: #fff;
          padding: 20px;
          min-height: 60px;
          color: #333;
        ">
          <div id="account-answer-${q.id}" 
            contenteditable="true"
            data-question-id="${q.id}"
            style="
              font-size: 14px; 
              line-height: 1.6; 
              word-break: break-word;
              outline: none;
              cursor: text;
              min-height: 20px;
              ${q.answer ? '' : 'color: #999; text-align: center;'}
            "
            onblur="saveAccountQuestionAnswer('${q.id}')"
            onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();this.blur();}"
            onfocus="if(this.textContent==='点击此处回复...'){this.textContent='';this.style.color='#333';this.style.textAlign='left';}">${
              q.answer || '点击此处回复...'
            }</div>
        </div>
        
        <!-- 日期标签 -->
        <div style="
          background-color: #f5f5f5;
          padding: 8px 20px;
          color: #999;
          font-size: 12px;
          text-align: right;
        ">
          ${dateStr}
        </div>
      </div>
    `;
      })
      .join('');
  }

  // 保存账户提问回复（原处编辑）
  window.saveAccountQuestionAnswer = async function (questionId) {
    const answerEl = document.getElementById(`account-answer-${questionId}`);
    if (!answerEl) return;

    const question = accountAskboxData.answeredQuestions.find(q => q.id === questionId);
    if (!question) return;

    let newAnswer = answerEl.textContent.trim();

    // 如果是占位符文本，则清空
    if (newAnswer === '点击此处回复...') {
      newAnswer = '';
    }

    if (newAnswer !== question.answer) {
      question.answer = newAnswer;
      await saveAccountAskboxDataToDB();
      console.log('✅ 回复已自动保存:', questionId);
    }
  };

  // ============================================
  // 账户提问箱多选删除功能
  // ============================================

  // 开始长按提问卡片
  window.startAccountQuestionLongPress = function (questionId) {
    if (isAccountAskboxMultiSelectMode) return;

    accountQuestionLongPressTimer = setTimeout(() => {
      enterAccountAskboxMultiSelectMode();
      toggleAccountQuestionSelection(questionId);
    }, 500);
  };

  // 结束长按
  window.endAccountQuestionLongPress = function () {
    if (accountQuestionLongPressTimer) {
      clearTimeout(accountQuestionLongPressTimer);
      accountQuestionLongPressTimer = null;
    }
  };

  // 切换提问选择状态
  window.toggleAccountQuestionSelection = function (questionId) {
    if (!isAccountAskboxMultiSelectMode) {
      enterAccountAskboxMultiSelectMode();
    }

    const questionEl = document.querySelector(`.account-askbox-question-item[data-question-id="${questionId}"]`);
    if (!questionEl) return;

    if (selectedAccountQuestions.has(questionId)) {
      selectedAccountQuestions.delete(questionId);
      questionEl.style.border = '';
      questionEl.style.backgroundColor = 'rgba(255,255,255,0.9)';
    } else {
      selectedAccountQuestions.add(questionId);
      questionEl.style.border = '3px solid #1d9bf0';
      questionEl.style.backgroundColor = 'rgba(29, 155, 240, 0.1)';
    }

    updateAccountAskboxDeleteUI();
  };

  // 进入账户提问箱多选模式
  function enterAccountAskboxMultiSelectMode() {
    isAccountAskboxMultiSelectMode = true;
    showAccountAskboxDeleteToolbar();

    document.querySelectorAll('.account-askbox-question-item').forEach(item => {
      item.style.borderLeft = '3px solid #1d9bf0';
    });

    console.log('✅ 已进入账户提问箱多选模式');
  }

  // 退出账户提问箱多选模式
  window.exitAccountAskboxMultiSelectMode = function () {
    isAccountAskboxMultiSelectMode = false;
    selectedAccountQuestions.clear();
    hideAccountAskboxDeleteToolbar();

    document.querySelectorAll('.account-askbox-question-item').forEach(item => {
      item.style.border = '';
      item.style.borderLeft = '';
      item.style.backgroundColor = 'rgba(255,255,255,0.9)';
    });

    console.log('✅ 已退出账户提问箱多选模式');
  };

  // 显示账户提问箱删除工具栏
  function showAccountAskboxDeleteToolbar() {
    let toolbar = document.getElementById('account-askbox-delete-toolbar');
    if (!toolbar) {
      toolbar = document.createElement('div');
      toolbar.id = 'account-askbox-delete-toolbar';
      toolbar.style.cssText = `
        position: fixed;
        bottom: 80px;
        left: 50%;
        transform: translateX(-50%);
        background-color: rgba(0,0,0,0.95);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255,255,255,0.2);
        border-radius: 24px;
        padding: 12px 20px;
        display: flex;
        align-items: center;
        gap: 16px;
        z-index: 2000;
        box-shadow: 0 4px 20px rgba(0,0,0,0.5);
      `;

      toolbar.innerHTML = `
        <button onclick="selectAllAccountQuestions()" style="
          background-color: #1d9bf0; 
          color: #fff; 
          border: none; 
          border-radius: 20px; 
          padding: 8px 16px; 
          font-size: 14px; 
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        " onmouseover="this.style.backgroundColor='#1a8cd8'" onmouseout="this.style.backgroundColor='#1d9bf0'">
          全选
        </button>
        <span id="account-askbox-selected-count" style="color: #fff; font-size: 14px; font-weight: 500;">已选择 0 个</span>
        <button onclick="deleteSelectedAccountQuestions()" style="
          background-color: #f91880; 
          color: #fff; 
          border: none; 
          border-radius: 20px; 
          padding: 8px 16px; 
          font-size: 14px; 
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        " onmouseover="this.style.backgroundColor='#d0155f'" onmouseout="this.style.backgroundColor='#f91880'">
          删除
        </button>
        <button onclick="exitAccountAskboxMultiSelectMode()" style="
          background-color: rgba(255,255,255,0.15); 
          color: #fff; 
          border: none; 
          border-radius: 20px; 
          padding: 8px 16px; 
          font-size: 14px; 
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        " onmouseover="this.style.backgroundColor='rgba(255,255,255,0.25)'" onmouseout="this.style.backgroundColor='rgba(255,255,255,0.15)'">
          取消
        </button>
      `;

      document.body.appendChild(toolbar);
    }
    toolbar.style.display = 'flex';
  }

  // 隐藏账户提问箱删除工具栏
  function hideAccountAskboxDeleteToolbar() {
    const toolbar = document.getElementById('account-askbox-delete-toolbar');
    if (toolbar) {
      toolbar.style.display = 'none';
    }
  }

  // 更新账户提问箱删除UI
  function updateAccountAskboxDeleteUI() {
    const countEl = document.getElementById('account-askbox-selected-count');
    if (countEl) {
      countEl.textContent = `已选择 ${selectedAccountQuestions.size} 个`;
    }
  }

  // 全选账户提问
  window.selectAllAccountQuestions = function () {
    document.querySelectorAll('.account-askbox-question-item').forEach(item => {
      const questionId = item.dataset.questionId;
      if (!selectedAccountQuestions.has(questionId)) {
        selectedAccountQuestions.add(questionId);
        item.style.border = '3px solid #1d9bf0';
        item.style.backgroundColor = 'rgba(29, 155, 240, 0.1)';
      }
    });
    updateAccountAskboxDeleteUI();
  };

  // 删除选中的账户提问
  window.deleteSelectedAccountQuestions = async function () {
    if (selectedAccountQuestions.size === 0) {
      showXToast('请先选择要删除的提问', 'warning');
      return;
    }

    const confirmDelete = confirm(`确定要删除选中的 ${selectedAccountQuestions.size} 个提问吗？删除后无法恢复。`);
    if (!confirmDelete) return;

    try {
      accountAskboxData.answeredQuestions = accountAskboxData.answeredQuestions.filter(
        q => !selectedAccountQuestions.has(q.id),
      );
      await saveAccountAskboxDataToDB();
      showXToast(`已删除 ${selectedAccountQuestions.size} 个提问`, 'success');
      window.exitAccountAskboxMultiSelectMode();
      renderAccountAnsweredQuestions();
    } catch (error) {
      console.error('删除提问失败:', error);
      showXToast('删除失败: ' + error.message, 'error');
    }
  };

  // X设置页面相关功能
  let xSettingsData = {
    systemPrompt: '',
    worldSetting: '',
    characterBinding: false,
    boundCharacters: [],
  };

  // 用户资料数据 - 初始化全局变量（实际数据将在loadUserProfile时从数据库加载）
  if (!window.userProfileData) {
    window.userProfileData = {
      name: '我',
      handle: '@me',
      avatar: 'https://i.postimg.cc/pXxk1JXk/IMG-6442.jpg',
      coverImage: 'https://i.postimg.cc/qRzMB6nQ/default-cover.jpg',
      bio: '欢迎来到我的X主页！',
      verified: false,
      verificationType: 'none',
      coupleCharacterId: '',
      coupleCharacterName: '',
      customTag1: '科技爱好者',
      customTag1Icon: '✨',
      customTag1Color: '#71767b',
      customTag2: '2024年加入',
      customTag2Icon: '📅',
      customTag2Color: '#71767b',
      following: '156',
      followers: '89',
      knownIdentityCharacters: [],
      publicIdentity: '',
      showRealName: false,
      realName: '',
    };
  }

  // 创建局部引用指向全局变量（确保所有地方都访问同一个对象）
  let userProfileData = window.userProfileData;

  // 获取用户认证类型描述
  function getUserVerificationTypeDescription(userProfile) {
    const verificationType = userProfile.verificationType || 'none';
    const descriptions = {
      none: '无认证',
      verified: '已认证（蓝色勾标）',
      couple: '情侣认证（白色心形）',
      married: '已婚认证（白色圆环）',
      vip: 'VIP认证（白色菱形）',
    };
    return descriptions[verificationType] || '无认证';
  }

  // 初始化X设置
  async function initializeXSettings() {
    try {
      const db = getXDB();

      // 按账号加载设置
      const settingsId = `xSettings_${currentAccountId || 'main'}`;
      const savedSettings = await db.xSettings.get(settingsId);
      if (savedSettings) {
        xSettingsData = savedSettings;
        loadXSettingsToUI();
      } else {
        // 如果当前账号没有设置，使用默认设置
        xSettingsData = {
          systemPrompt: '',
          worldSetting: '',
          characterBinding: false,
          boundCharacters: [],
          npcBinding: false,
        };
        loadXSettingsToUI();
      }

      // 加载预设列表
      loadXPresetsList();

      console.log('✅ X设置已加载 (账户:', currentAccountId || 'main', ')');
    } catch (error) {
      console.error('初始化X设置失败:', error);
    }
  }

  // 将设置数据加载到UI
  function loadXSettingsToUI() {
    document.getElementById('x-system-prompt').value = xSettingsData.systemPrompt || '';
    document.getElementById('x-world-setting').value = xSettingsData.worldSetting || '';

    // 确保 boundCharacters 数组存在
    if (!xSettingsData.boundCharacters) {
      xSettingsData.boundCharacters = [];
    }

    updateCharacterToggleUI();

    // 如果开启了角色绑定，显示角色选择区域
    const bindingArea = document.getElementById('character-binding-area');
    if (xSettingsData.characterBinding) {
      bindingArea.style.display = 'block';
      loadCharactersList();
    } else {
      bindingArea.style.display = 'none';
    }

    // 更新NPC绑定UI
    updateNPCToggleUI();

    // 如果开启了NPC绑定，显示NPC管理区域
    const npcArea = document.getElementById('npc-binding-area');
    if (xSettingsData.npcBinding) {
      npcArea.style.display = 'block';
      loadNPCsList();
    } else {
      npcArea.style.display = 'none';
    }
  }

  // 切换角色绑定 (已被新版本替换，在新位置)

  // 保存X设置（按账号存储）
  async function saveXSettings() {
    try {
      // 获取UI中的数据
      xSettingsData.systemPrompt = document.getElementById('x-system-prompt').value;
      xSettingsData.worldSetting = document.getElementById('x-world-setting').value;

      const db = getXDB();
      const settingsId = `xSettings_${currentAccountId || 'main'}`;

      await db.xSettings.put({
        id: settingsId,
        ...xSettingsData,
        lastUpdated: new Date().toISOString(),
      });

      console.log('✅ X设置已保存 (账户:', currentAccountId || 'main', ')');
      showXToast('设置已保存', 'success');
    } catch (error) {
      console.error('保存设置失败:', error);
      showXToast('保存失败: ' + error.message, 'error');
    }
  }

  // 保存为预设
  async function saveXPreset() {
    const presetName = prompt('请输入预设名称:');
    if (!presetName || presetName.trim() === '') {
      showXToast('预设名称不能为空', 'error');
      return;
    }

    try {
      // 只保存提示词和世界观设定
      const presetData = {
        systemPrompt: document.getElementById('x-system-prompt').value,
        worldSetting: document.getElementById('x-world-setting').value,
        characterBinding: xSettingsData.characterBinding || false,
        boundCharacters: xSettingsData.boundCharacters || [],
      };

      const db = getXDB();

      await db.xPresets.add({
        name: presetName.trim(),
        ...presetData,
        createdAt: new Date().toISOString(),
      });

      showXToast(`预设"${presetName}"已保存`, 'success');
      loadXPresetsList(); // 刷新预设列表
    } catch (error) {
      console.error('保存预设失败:', error);
      showXToast('保存预设失败: ' + error.message, 'error');
    }
  }

  // 加载预设列表
  async function loadXPresetsList() {
    try {
      const db = getXDB();

      const presets = await db.xPresets.orderBy('createdAt').reverse().toArray();
      const presetsList = document.getElementById('x-presets-list');

      if (presets.length === 0) {
        presetsList.innerHTML =
          '<p style="color: #71767b; font-size: 14px; text-align: center; margin: 20px 0;">暂无保存的预设</p>';
        return;
      }

      presetsList.innerHTML = presets
        .map(
          preset => `
                <div class="preset-item" style="display: flex; align-items: center; justify-content: space-between; background-color: #1a1a1a; border: 1px solid #333; border-radius: 8px; padding: 12px; margin-bottom: 8px;">
                  <div style="flex: 1; min-width: 0;">
                    <div style="color: #fff; font-weight: 600; font-size: 15px; margin-bottom: 4px; word-wrap: break-word;">${
                      preset.name
                    }</div>
                    <div style="color: #71767b; font-size: 13px;">${new Date(preset.createdAt).toLocaleString()}</div>
                  </div>
                  <div style="display: flex; gap: 8px; flex-shrink: 0;">
                    <button onclick="loadXPreset(${preset.id})" 
                      style="background-color: #1d9bf0; color: #fff; border: none; border-radius: 15px; padding: 6px 12px; font-size: 12px; cursor: pointer; white-space: nowrap;">
                      加载
                    </button>
                    <button onclick="deleteXPreset(${preset.id})" 
                      style="background-color: #f4212e; color: #fff; border: none; border-radius: 15px; padding: 6px 12px; font-size: 12px; cursor: pointer; white-space: nowrap;">
                      删除
                    </button>
                  </div>
                </div>
              `,
        )
        .join('');
    } catch (error) {
      console.error('加载预设列表失败:', error);
    }
  }

  // 加载预设
  async function loadXPreset(presetId) {
    try {
      const db = getXDB();
      const preset = await db.xPresets.get(presetId);
      if (preset) {
        // 加载所有设定
        document.getElementById('x-system-prompt').value = preset.systemPrompt || '';
        document.getElementById('x-world-setting').value = preset.worldSetting || '';
        xSettingsData.characterBinding = preset.characterBinding || false;
        xSettingsData.boundCharacters = preset.boundCharacters || [];

        // 更新UI
        loadXSettingsToUI();

        showXToast(`已加载预设"${preset.name}"`, 'success');
      }
    } catch (error) {
      console.error('加载预设失败:', error);
      showXToast('加载预设失败: ' + error.message, 'error');
    }
  }

  // 删除预设
  async function deleteXPreset(presetId) {
    if (!confirm('确定要删除这个预设吗？')) return;

    try {
      const db = getXDB();

      await db.xPresets.delete(presetId);
      showXToast('预设已删除', 'success');
      loadXPresetsList(); // 刷新预设列表
    } catch (error) {
      console.error('删除预设失败:', error);
      showXToast('删除预设失败: ' + error.message, 'error');
    }
  }

  // 导出所有X数据
  async function exportXData() {
    try {
      const xDb = getXDB();

      // 导出所有X数据库内容
      const exportData = {
        // X设置
        xSettings: await xDb.xSettings.toArray(),
        // 用户资料（所有账户）
        xUserProfile: await xDb.xUserProfile.toArray(),
        // 推文数据
        xTweetsData: await xDb.xTweetsData.toArray(),
        // 用户发布的推文（所有账户）
        xUserTweets: await xDb.xUserTweets.toArray(),
        // 角色X资料
        xCharacterProfiles: await xDb.xCharacterProfiles.toArray(),
        // 预设
        xPresets: await xDb.xPresets.toArray(),
        // 用户提问箱数据
        xAskbox: await xDb.xAskbox.toArray(),
        // 当前活跃账户
        xActiveAccount: await xDb.xActiveAccount.toArray(),
        // 账户列表
        xAccountList: await xDb.xAccountList.toArray(),
        // NPC设置
        xNPCs: await xDb.xNPCs.toArray(),
        // 账户主页数据
        xAccountProfiles: await xDb.xAccountProfiles.toArray(),
        // 账户提问箱数据
        xAccountAskbox: await xDb.xAccountAskbox.toArray(),
        // 元数据
        exportTime: new Date().toISOString(),
        version: '2.0',
        dataType: 'x-social-full-backup',
      };

      const dataStr = JSON.stringify(exportData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });

      const link = document.createElement('a');
      link.href = URL.createObjectURL(dataBlob);
      link.download = `x-data-backup-${new Date().toISOString().split('T')[0]}.json`;
      link.click();

      showXToast('所有数据已导出', 'success');
      console.log('✅ X数据导出成功，包含:', {
        设置数: exportData.xSettings.length,
        用户资料数: exportData.xUserProfile.length,
        推文数据数: exportData.xTweetsData.length,
        用户推文数: exportData.xUserTweets.length,
        角色X资料数: exportData.xCharacterProfiles.length,
        预设数: exportData.xPresets.length,
        用户提问箱数: exportData.xAskbox.length,
        活跃账户数: exportData.xActiveAccount.length,
        账户列表数: exportData.xAccountList.length,
        NPC设置数: exportData.xNPCs.length,
        账户主页数: exportData.xAccountProfiles.length,
        账户提问箱数: exportData.xAccountAskbox.length,
      });
    } catch (error) {
      console.error('❌ 导出数据失败:', error);
      showXToast('导出失败: ' + error.message, 'error');
    }
  }

  // 导入所有X数据
  function importXData() {
    if (
      !confirm(
        '⚠️ 警告：导入数据将完全替换当前所有X数据（包括用户资料、推文、帖子、设置等），此操作不可撤销！\n\n确定要继续吗？',
      )
    ) {
      return;
    }

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';

    input.onchange = async function (event) {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = async function (e) {
        try {
          const importData = JSON.parse(e.target.result);

          // 验证数据格式
          if (!importData || importData.dataType !== 'x-social-full-backup') {
            showXToast('导入失败: 不是有效的X数据备份文件', 'error');
            return;
          }

          showXToast('正在导入数据，请稍候...', 'info');

          const xDb = getXDB();

          // 清空现有数据
          await xDb.xSettings.clear();
          await xDb.xUserProfile.clear();
          await xDb.xTweetsData.clear();
          await xDb.xUserTweets.clear();
          await xDb.xCharacterProfiles.clear();
          await xDb.xPresets.clear();
          await xDb.xAskbox.clear();
          await xDb.xActiveAccount.clear();
          await xDb.xAccountList.clear();
          await xDb.xNPCs.clear();
          await xDb.xAccountProfiles.clear();
          await xDb.xAccountAskbox.clear();

          console.log('✅ 已清空旧数据');

          // 导入新数据
          if (importData.xSettings && importData.xSettings.length > 0) {
            await xDb.xSettings.bulkAdd(importData.xSettings);
          }
          if (importData.xUserProfile && importData.xUserProfile.length > 0) {
            await xDb.xUserProfile.bulkAdd(importData.xUserProfile);
          }
          if (importData.xTweetsData && importData.xTweetsData.length > 0) {
            await xDb.xTweetsData.bulkAdd(importData.xTweetsData);
          }
          if (importData.xUserTweets && importData.xUserTweets.length > 0) {
            await xDb.xUserTweets.bulkAdd(importData.xUserTweets);
          }
          if (importData.xCharacterProfiles && importData.xCharacterProfiles.length > 0) {
            await xDb.xCharacterProfiles.bulkAdd(importData.xCharacterProfiles);
          }
          if (importData.xPresets && importData.xPresets.length > 0) {
            await xDb.xPresets.bulkAdd(importData.xPresets);
          }
          if (importData.xAskbox && importData.xAskbox.length > 0) {
            await xDb.xAskbox.bulkAdd(importData.xAskbox);
          }
          if (importData.xActiveAccount && importData.xActiveAccount.length > 0) {
            await xDb.xActiveAccount.bulkAdd(importData.xActiveAccount);
          }
          if (importData.xAccountList && importData.xAccountList.length > 0) {
            await xDb.xAccountList.bulkAdd(importData.xAccountList);
          }
          if (importData.xNPCs && importData.xNPCs.length > 0) {
            await xDb.xNPCs.bulkAdd(importData.xNPCs);
          }
          if (importData.xAccountProfiles && importData.xAccountProfiles.length > 0) {
            await xDb.xAccountProfiles.bulkAdd(importData.xAccountProfiles);
          }
          if (importData.xAccountAskbox && importData.xAccountAskbox.length > 0) {
            await xDb.xAccountAskbox.bulkAdd(importData.xAccountAskbox);
          }

          console.log('✅ X数据导入成功，包含:', {
            设置数: importData.xSettings?.length || 0,
            用户资料数: importData.xUserProfile?.length || 0,
            推文数据数: importData.xTweetsData?.length || 0,
            用户推文数: importData.xUserTweets?.length || 0,
            角色X资料数: importData.xCharacterProfiles?.length || 0,
            预设数: importData.xPresets?.length || 0,
            用户提问箱数: importData.xAskbox?.length || 0,
            活跃账户数: importData.xActiveAccount?.length || 0,
            账户列表数: importData.xAccountList?.length || 0,
            NPC设置数: importData.xNPCs?.length || 0,
            账户主页数: importData.xAccountProfiles?.length || 0,
            账户提问箱数: importData.xAccountAskbox?.length || 0,
          });

          showXToast('数据导入成功！页面即将刷新...', 'success');

          // 延迟刷新，让用户看到成功提示
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        } catch (error) {
          console.error('❌ 导入数据失败:', error);
          showXToast('导入失败: ' + error.message, 'error');
        }
      };
      reader.readAsText(file);
    };

    input.click();
  }

  // 切换角色绑定
  function toggleCharacterBinding() {
    xSettingsData.characterBinding = !xSettingsData.characterBinding;
    updateCharacterToggleUI();

    const bindingArea = document.getElementById('character-binding-area');
    if (xSettingsData.characterBinding) {
      bindingArea.style.display = 'block';
      loadCharactersList();
    } else {
      bindingArea.style.display = 'none';
      // 清空绑定的角色
      if (!xSettingsData.boundCharacters) xSettingsData.boundCharacters = [];
    }
  }

  // 更新角色绑定切换按钮UI
  function updateCharacterToggleUI() {
    const toggle = document.getElementById('x-character-toggle');
    const circle = toggle.querySelector('.toggle-circle');

    if (xSettingsData.characterBinding) {
      toggle.style.backgroundColor = '#1d9bf0';
      circle.style.left = '22px';
    } else {
      toggle.style.backgroundColor = '#333';
      circle.style.left = '2px';
    }
  }

  // 加载角色列表
  async function loadCharactersList() {
    try {
      // 获取所有聊天中的非群组角色
      const db = getDB(); // 修正：chats表在全局数据库中
      const allChats = await db.chats.toArray();
      const characters = allChats.filter(chat => !chat.isGroup);

      const charactersList = document.getElementById('characters-list');

      if (characters.length === 0) {
        charactersList.innerHTML = TemplateBuilders.buildEmptyState('暂无可绑定的角色，请先创建角色聊天');
        return;
      }

      if (!xSettingsData.boundCharacters) xSettingsData.boundCharacters = [];

      charactersList.innerHTML = characters
        .map(character => {
          const isChecked = xSettingsData.boundCharacters.includes(character.id);
          return TemplateBuilders.buildCharacterItem(character, isChecked);
        })
        .join('');
    } catch (error) {
      ValidationUtils.handleError(error, '加载角色列表');
      document.getElementById('characters-list').innerHTML = TemplateBuilders.buildErrorState('加载角色列表失败');
    }
  }

  // 切换角色选择状态
  function toggleCharacterSelection(characterId) {
    if (!xSettingsData.boundCharacters) {
      xSettingsData.boundCharacters = [];
    }

    const index = xSettingsData.boundCharacters.indexOf(characterId);
    if (index > -1) {
      xSettingsData.boundCharacters.splice(index, 1);
    } else {
      xSettingsData.boundCharacters.push(characterId);
    }

    // 更新UI
    const checkbox = document.querySelector(`[data-character-id="${characterId}"]`);
    if (checkbox) {
      const isChecked = xSettingsData.boundCharacters.includes(characterId);
      checkbox.outerHTML = TemplateBuilders.buildCheckbox(characterId, isChecked);
    }
  }

  // 长按相关变量
  let longPressTimer = null;
  let longPressTarget = null;

  // 开始长按
  function startLongPress(characterId) {
    longPressTarget = characterId;
    longPressTimer = setTimeout(() => {
      if (longPressTarget === characterId) {
        openCharacterXProfile(characterId);
      }
    }, 500); // 500ms长按触发
  }

  // 结束长按
  function endLongPress() {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      longPressTimer = null;
    }
    longPressTarget = null;
  }

  // 打开角色X资料设置
  async function openCharacterXProfile(characterId) {
    try {
      const db = getDB(); // 修正：chats表在全局数据库中
      const xDb = getXDB(); // X专用数据库用于xCharacterProfiles

      const character = await db.chats.get(characterId);
      if (!character) {
        showXToast('未找到角色信息', 'error');
        return;
      }

      // 加载现有的X资料
      let xProfile = await xDb.xCharacterProfiles.get(characterId);
      if (!xProfile) {
        // 创建默认X资料
        xProfile = {
          characterId: characterId,
          xName: character.name,
          xHandle: character.name.toLowerCase().replace(/\s+/g, '_'),
          xAvatar: 'https://i.postimg.cc/4xmx7V4R/mmexport1759081128356.jpg',
          xVerified: false,
          xBio: '',
          relationships: [],
        };
      }

      // 确保有relationships字段
      if (!xProfile.relationships) {
        xProfile.relationships = [];
      }

      // 填充弹窗内容
      const infoDisplay = document.getElementById('character-info-display');
      if (infoDisplay) {
        infoDisplay.innerHTML = TemplateBuilders.buildCharacterInfoDisplay(character);
      }

      // 获取所有表单元素
      const avatarElement = document.getElementById('character-x-avatar');
      const avatarUrlElement = document.getElementById('character-x-avatar-url');
      const coverPreviewElement = document.getElementById('character-x-cover-preview');
      const coverUrlElement = document.getElementById('character-x-cover-url');
      const nameElement = document.getElementById('character-x-name');
      const handleElement = document.getElementById('character-x-handle');
      const verifiedElement = document.getElementById('character-x-verified');
      const tag1IconElement = document.getElementById('character-tag1-icon');
      const tag1TextElement = document.getElementById('character-custom-tag1');
      const tag1ColorElement = document.getElementById('character-tag1-color');
      const tag2IconElement = document.getElementById('character-tag2-icon');
      const tag2TextElement = document.getElementById('character-custom-tag2');
      const tag2ColorElement = document.getElementById('character-tag2-color');
      const followingCountElement = document.getElementById('character-following-count');
      const followersCountElement = document.getElementById('character-followers-count');
      const bioElement = document.getElementById('character-x-bio');
      const publicIdentityElement = document.getElementById('character-public-identity');
      const showRealNameElement = document.getElementById('character-show-real-name');
      const realNameElement = document.getElementById('character-real-name');

      // 安全地设置元素值 - 统一使用默认头像
      const defaultAvatar = 'https://i.postimg.cc/4xmx7V4R/mmexport1759081128356.jpg';
      if (avatarElement) avatarElement.src = defaultAvatar;
      if (avatarUrlElement) avatarUrlElement.value = defaultAvatar;
      if (coverPreviewElement)
        coverPreviewElement.src = xProfile.xCover || 'https://i.postimg.cc/qRzMB6nQ/default-cover.jpg';
      if (coverUrlElement) coverUrlElement.value = xProfile.xCover || '';
      if (nameElement) nameElement.value = xProfile.xName;
      if (handleElement) handleElement.value = xProfile.xHandle;
      if (verifiedElement) verifiedElement.checked = xProfile.xVerified;
      if (tag1IconElement) tag1IconElement.value = xProfile.customTag1?.icon || '';
      if (tag1TextElement) tag1TextElement.value = xProfile.customTag1?.text || '';
      if (tag1ColorElement) tag1ColorElement.value = xProfile.customTag1?.color || '#71767b';
      if (tag2IconElement) tag2IconElement.value = xProfile.customTag2?.icon || '';
      if (tag2TextElement) tag2TextElement.value = xProfile.customTag2?.text || '';
      if (tag2ColorElement) tag2ColorElement.value = xProfile.customTag2?.color || '#71767b';
      if (followingCountElement) followingCountElement.value = xProfile.followingCount || '';
      if (followersCountElement) followersCountElement.value = xProfile.followersCount || '';
      if (bioElement) bioElement.value = xProfile.xBio || '';
      if (publicIdentityElement) publicIdentityElement.value = xProfile.publicIdentity || '';
      if (showRealNameElement) showRealNameElement.checked = xProfile.showRealName || false;
      if (realNameElement) realNameElement.value = xProfile.realName || '';

      // 根据复选框状态显示/隐藏真名输入框
      toggleCharacterRealNameInput();

      // 更新字符计数
      updateCharacterXProfileCounts();

      // 设置当前编辑的角色ID
      document.getElementById('character-x-profile-form').setAttribute('data-character-id', characterId);

      // 渲染关系列表
      renderRelationshipsList(xProfile.relationships || []);

      // 显示弹窗
      document.getElementById('character-x-profile-modal').style.display = 'block';
    } catch (error) {
      ValidationUtils.handleError(error, '打开角色X资料');
    }
  }

  // 关闭角色X资料设置弹窗
  function closeCharacterXProfileModal() {
    document.getElementById('character-x-profile-modal').style.display = 'none';
  }

  // 更新角色X头像
  function updateCharacterXAvatar(url) {
    const avatarImg = document.getElementById('character-x-avatar');

    if (!url || url.trim() === '') {
      // 如果URL为空，使用默认头像
      avatarImg.src = 'https://i.postimg.cc/4xmx7V4R/mmexport1759081128356.jpg';
      return;
    }

    // 验证URL格式
    try {
      new URL(url);
    } catch (e) {
      avatarImg.src = 'https://i.postimg.cc/4xmx7V4R/mmexport1759081128356.jpg';
      return;
    }

    // 验证是否为图片URL
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp'];
    const isImageUrl = imageExtensions.some(ext => url.toLowerCase().includes(ext));

    if (!isImageUrl) {
      // 不是明显的图片URL，但仍然尝试加载
      avatarImg.onerror = function () {
        this.src = 'https://i.postimg.cc/4xmx7V4R/mmexport1759081128356.jpg';
        showXToast('头像链接无效，已使用默认头像', 'warning');
      };
    }

    avatarImg.src = url;
  }

  // 更新角色X背景图
  function updateCharacterXCover(url) {
    const coverImg = document.getElementById('character-x-cover-preview');

    if (!url || url.trim() === '') {
      coverImg.src = 'https://i.postimg.cc/qRzMB6nQ/default-cover.jpg';
      return;
    }

    try {
      new URL(url);
    } catch (e) {
      coverImg.src = 'https://i.postimg.cc/qRzMB6nQ/default-cover.jpg';
      return;
    }

    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp'];
    const isImageUrl = imageExtensions.some(ext => url.toLowerCase().includes(ext));

    if (!isImageUrl) {
      coverImg.onerror = function () {
        this.src = 'https://i.postimg.cc/qRzMB6nQ/default-cover.jpg';
        showXToast('背景图链接无效，已使用默认背景', 'warning');
      };
    }

    coverImg.src = url;
  }

  // 更新简介字符计数（保持兼容性）
  function updateCharacterBioCount() {
    updateCharacterXProfileCounts();
  }

  // 更新角色X资料所有字符计数
  function updateCharacterXProfileCounts() {
    // 更新简介计数
    const bioTextarea = document.getElementById('character-x-bio');
    const bioCountSpan = document.getElementById('character-bio-count');
    if (bioTextarea && bioCountSpan) {
      bioCountSpan.textContent = bioTextarea.value.length;
    }

    // 角色公众身份已移除字符限制，无需计数

    // 更新真实姓名计数
    const realNameInput = document.getElementById('character-real-name');
    const realNameCountSpan = document.getElementById('character-real-name-count');
    if (realNameInput && realNameCountSpan) {
      realNameCountSpan.textContent = realNameInput.value.length;
    }
  }

  // 保存角色X资料
  async function saveCharacterXProfile(event) {
    event.preventDefault();

    const characterId = document.getElementById('character-x-profile-form').getAttribute('data-character-id');
    const xName = document.getElementById('character-x-name').value.trim();
    const xHandle = document.getElementById('character-x-handle').value.trim();
    const xAvatarUrl = document.getElementById('character-x-avatar-url').value.trim();
    const xAvatar = xAvatarUrl || 'https://i.postimg.cc/4xmx7V4R/mmexport1759081128356.jpg';
    const xVerified = document.getElementById('character-x-verified').checked;
    const xCoverUrl = document.getElementById('character-x-cover-url').value.trim();
    const xCover = xCoverUrl || 'https://i.postimg.cc/qRzMB6nQ/default-cover.jpg';
    const tag1Icon = document.getElementById('character-tag1-icon').value.trim();
    const tag1Text = document.getElementById('character-custom-tag1').value.trim();
    const tag1Color = document.getElementById('character-tag1-color').value;
    const tag2Icon = document.getElementById('character-tag2-icon').value.trim();
    const tag2Text = document.getElementById('character-custom-tag2').value.trim();
    const tag2Color = document.getElementById('character-tag2-color').value;
    const followingCount = document.getElementById('character-following-count').value.trim();
    const followersCount = document.getElementById('character-followers-count').value.trim();
    const xBio = document.getElementById('character-x-bio').value.trim();
    const publicIdentity = document.getElementById('character-public-identity').value.trim();
    const showRealName = document.getElementById('character-show-real-name').checked;
    const realName = document.getElementById('character-real-name').value.trim();

    // 验证数据
    if (!xName) {
      showXToast('X用户名不能为空', 'error');
      return;
    }

    if (!xHandle) {
      showXToast('X句柄不能为空', 'error');
      return;
    }

    if (xName.length > 50) {
      showXToast('X用户名不能超过50个字符', 'error');
      return;
    }

    if (xHandle.length > 15) {
      showXToast('X句柄不能超过15个字符', 'error');
      return;
    }

    if (xBio.length > 160) {
      showXToast('X简介不能超过160个字符', 'error');
      return;
    }

    // 公众身份已移除字符限制

    if (showRealName && realName.length > 50) {
      showXToast('真实姓名不能超过50个字符', 'error');
      return;
    }

    if (showRealName && !realName) {
      showXToast('选择公开真名时必须填写真实姓名', 'error');
      return;
    }

    // 验证头像URL
    if (xAvatarUrl) {
      try {
        new URL(xAvatarUrl);
      } catch (e) {
        showXToast('头像URL格式无效', 'error');
        return;
      }
    }

    try {
      const db = getXDB();
      // 获取当前关系数据
      const currentProfile = await db.xCharacterProfiles.get(characterId);
      const currentRelationships = currentProfile?.relationships || [];

      // 保存X资料
      await db.xCharacterProfiles.put({
        characterId: characterId,
        xName: xName,
        xHandle: xHandle,
        xAvatar: xAvatar,
        xVerified: xVerified,
        xCover: xCover,
        customTag1: tag1Text ? { icon: tag1Icon, text: tag1Text, color: tag1Color } : null,
        customTag2: tag2Text ? { icon: tag2Icon, text: tag2Text, color: tag2Color } : null,
        followingCount: followingCount,
        followersCount: followersCount,
        xBio: xBio,
        publicIdentity: publicIdentity,
        showRealName: showRealName,
        realName: showRealName ? realName : '', // 只有选择公开时才保存真名
        relationships: currentRelationships,
        lastUpdated: new Date().toISOString(),
      });

      showXToast('X资料已保存', 'success');
      closeCharacterXProfileModal();
    } catch (error) {
      console.error('保存角色X资料失败:', error);
      showXToast('保存失败: ' + error.message, 'error');
    }
  }

  // NPC关系绑定功能

  // 当前编辑的关系ID（用于编辑模式）
  let currentEditingRelationshipId = null;
  // 当前关系列表
  let currentRelationships = [];

  // 渲染关系列表
  function renderRelationshipsList(relationships) {
    currentRelationships = relationships || [];
    const container = document.getElementById('character-relationships-list');

    if (currentRelationships.length === 0) {
      container.innerHTML = `
                <div style="text-align: center; color: #71767b; font-size: 13px; padding: 20px;">
                  暂无绑定关系，点击上方"添加关系"按钮开始绑定NPC
                </div>
              `;
      return;
    }

    container.innerHTML = currentRelationships
      .map(
        rel => `
              <div style="background-color: #1a1a1a; border: 1px solid #333; border-radius: 8px; padding: 12px; margin-bottom: 8px;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                  <div style="flex: 1;">
                    <div style="color: #fff; font-weight: 600; font-size: 14px; margin-bottom: 4px;">
                      ${rel.npcName} <span style="color: #71767b; font-weight: normal;">${rel.npcHandle}</span>
                    </div>
                    <div style="color: #1d9bf0; font-size: 12px; background-color: rgba(29,155,240,0.1); padding: 2px 8px; border-radius: 12px; display: inline-block; margin-bottom: 6px;">
                      ${rel.relationshipType}
                    </div>
                  </div>
                  <div style="display: flex; gap: 8px;">
                    <button onclick="editRelationship('${rel.id}')" 
                      style="background: none; border: none; color: #1d9bf0; cursor: pointer; padding: 4px 8px; font-size: 12px;">
                      编辑
                    </button>
                    <button onclick="deleteRelationship('${rel.id}')" 
                      style="background: none; border: none; color: #f4212e; cursor: pointer; padding: 4px 8px; font-size: 12px;">
                      删除
                    </button>
                  </div>
                </div>
                ${
                  rel.description
                    ? `<div style="color: #71767b; font-size: 12px; line-height: 1.4;">${rel.description}</div>`
                    : ''
                }
              </div>
            `,
      )
      .join('');
  }

  // 打开添加关系弹窗
  function openAddRelationshipModal() {
    currentEditingRelationshipId = null;
    document.getElementById('relationship-modal-title').textContent = '添加NPC关系';

    // 清空表单
    document.getElementById('relationship-npc-name').value = '';
    document.getElementById('relationship-npc-handle').value = '';
    document.getElementById('relationship-type').value = '朋友';
    document.getElementById('relationship-description').value = '';
    updateRelationshipDescCount();

    document.getElementById('relationship-modal').style.display = 'block';
  }

  // 编辑关系
  function editRelationship(relationshipId) {
    const relationship = currentRelationships.find(rel => rel.id === relationshipId);
    if (!relationship) return;

    currentEditingRelationshipId = relationshipId;
    document.getElementById('relationship-modal-title').textContent = '编辑NPC关系';

    // 填充表单
    document.getElementById('relationship-npc-name').value = relationship.npcName;
    document.getElementById('relationship-npc-handle').value = relationship.npcHandle;
    document.getElementById('relationship-type').value = relationship.relationshipType;
    document.getElementById('relationship-description').value = relationship.description || '';
    updateRelationshipDescCount();

    document.getElementById('relationship-modal').style.display = 'block';
  }

  // 删除关系
  async function deleteRelationship(relationshipId) {
    if (!confirm('确定要删除这个关系绑定吗？')) return;

    try {
      // 从当前列表中移除
      currentRelationships = currentRelationships.filter(rel => rel.id !== relationshipId);

      // 保存到数据库
      await saveRelationshipsToDatabase();

      // 更新界面
      renderRelationshipsList(currentRelationships);

      showXToast('关系已删除', 'success');
    } catch (error) {
      console.error('删除关系失败:', error);
      showXToast('删除失败', 'error');
    }
  }

  // 关闭关系编辑弹窗
  function closeRelationshipModal() {
    document.getElementById('relationship-modal').style.display = 'none';
    currentEditingRelationshipId = null;
  }

  // 更新关系描述字符计数
  function updateRelationshipDescCount() {
    const descTextarea = document.getElementById('relationship-description');
    const countSpan = document.getElementById('relationship-desc-count');
    countSpan.textContent = descTextarea.value.length;
  }

  // 保存关系到数据库
  async function saveRelationshipsToDatabase() {
    const characterId = document.getElementById('character-x-profile-form').getAttribute('data-character-id');
    if (!characterId) return;

    try {
      const db = getXDB();

      // 获取当前X资料
      const currentProfile = await db.xCharacterProfiles.get(characterId);
      if (currentProfile) {
        // 更新关系数据
        currentProfile.relationships = currentRelationships;
        await db.xCharacterProfiles.put(currentProfile);
      }
    } catch (error) {
      console.error('保存关系到数据库失败:', error);
      throw error;
    }
  }

  // 保存关系表单
  async function saveRelationshipForm(event) {
    event.preventDefault();

    const npcName = document.getElementById('relationship-npc-name').value.trim();
    const npcHandle = document.getElementById('relationship-npc-handle').value.trim();
    const relationshipType = document.getElementById('relationship-type').value;
    const description = document.getElementById('relationship-description').value.trim();

    // 验证数据
    if (!npcName) {
      showXToast('NPC名称不能为空', 'error');
      return;
    }

    if (!npcHandle) {
      showXToast('NPC句柄不能为空', 'error');
      return;
    }

    // 确保句柄格式正确
    const handleFormatted = npcHandle.startsWith('@') ? npcHandle : `@${npcHandle}`;

    try {
      if (currentEditingRelationshipId) {
        // 编辑模式
        const relationshipIndex = currentRelationships.findIndex(rel => rel.id === currentEditingRelationshipId);
        if (relationshipIndex !== -1) {
          currentRelationships[relationshipIndex] = {
            ...currentRelationships[relationshipIndex],
            npcName: npcName,
            npcHandle: handleFormatted,
            relationshipType: relationshipType,
            description: description,
            updatedAt: new Date().toISOString(),
          };
        }
      } else {
        // 添加模式
        const newRelationship = {
          id: 'rel_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
          npcName: npcName,
          npcHandle: handleFormatted,
          relationshipType: relationshipType,
          description: description,
          createdAt: new Date().toISOString(),
        };
        currentRelationships.push(newRelationship);
      }

      // 保存到数据库
      await saveRelationshipsToDatabase();

      // 更新界面
      renderRelationshipsList(currentRelationships);

      // 关闭弹窗
      closeRelationshipModal();

      showXToast(currentEditingRelationshipId ? '关系已更新' : '关系已添加', 'success');
    } catch (error) {
      console.error('保存关系失败:', error);
      showXToast('保存失败', 'error');
    }
  }

  // ============================================
  // NPC绑定功能
  // ============================================

  // 当前编辑的NPC ID
  let currentEditingNPCId = null;

  // 切换NPC绑定开关
  async function toggleNPCBinding() {
    xSettingsData.npcBinding = !xSettingsData.npcBinding;

    // 更新UI
    updateNPCToggleUI();

    // 显示/隐藏NPC管理区域
    const npcArea = document.getElementById('npc-binding-area');
    if (xSettingsData.npcBinding) {
      npcArea.style.display = 'block';
      await loadNPCsList();
    } else {
      npcArea.style.display = 'none';
    }

    // 自动保存设置
    await saveXSettings();
  }

  // 更新NPC绑定切换按钮UI
  function updateNPCToggleUI() {
    const toggle = document.getElementById('x-npc-toggle');
    const circle = toggle.querySelector('.toggle-circle');

    if (xSettingsData.npcBinding) {
      toggle.style.backgroundColor = '#1d9bf0';
      circle.style.left = '22px';
    } else {
      toggle.style.backgroundColor = '#333';
      circle.style.left = '2px';
    }
  }

  // 加载NPC列表
  async function loadNPCsList() {
    try {
      const db = getXDB();
      const npcId = 'xNPCs_global'; // 全局存储，所有账号共享
      const npcData = await db.xNPCs.get(npcId);
      const allNPCs = npcData?.npcs || [];

      // 过滤出绑定了当前账号的NPC
      const currentAccount = currentAccountId || 'main';
      const npcs = allNPCs.filter(npc => npc.boundUsers && npc.boundUsers.includes(currentAccount));

      const npcsList = document.getElementById('npcs-list');

      if (npcs.length === 0) {
        npcsList.innerHTML =
          '<p style="color: #71767b; font-size: 14px; text-align: center; padding: 20px 0;">暂无绑定到此账号的NPC，点击上方按钮创建</p>';
        return;
      }

      npcsList.innerHTML = npcs
        .map(
          npc => `
          <div style="
            background-color: #0a0a0a;
            border: 1px solid #2f3336;
            border-radius: 8px;
            padding: 12px;
            margin-bottom: 8px;
            display: flex;
            align-items: center;
            gap: 12px;
          ">
            <img src="${npc.avatar || 'https://i.postimg.cc/4xmx7V4R/mmexport1759081128356.jpg'}" 
              style="width: 48px; height: 48px; border-radius: 50%; flex-shrink: 0;" 
              alt="${npc.name}">
            <div style="flex: 1; min-width: 0;">
              <div style="color: #fff; font-weight: 600; font-size: 15px; margin-bottom: 2px;">${npc.name}</div>
              <div style="color: #71767b; font-size: 14px;">${npc.handle}</div>
              <div style="color: #71767b; font-size: 13px; margin-top: 4px;">
                绑定用户: ${npc.boundUsers?.length || 0}个
              </div>
            </div>
            <div style="display: flex; gap: 8px; flex-shrink: 0;">
              <button onclick="editNPC('${npc.id}')" style="
                background-color: #1d9bf0;
                color: #fff;
                border: none;
                border-radius: 15px;
                padding: 6px 12px;
                font-size: 13px;
                cursor: pointer;
                white-space: nowrap;
                transition: all 0.2s;
              " onmouseover="this.style.backgroundColor='#1a8cd8'" onmouseout="this.style.backgroundColor='#1d9bf0'">
                编辑
              </button>
              <button onclick="deleteNPC('${npc.id}')" style="
                background-color: #f4212e;
                color: #fff;
                border: none;
                border-radius: 15px;
                padding: 6px 12px;
                font-size: 13px;
                cursor: pointer;
                white-space: nowrap;
                transition: all 0.2s;
              " onmouseover="this.style.backgroundColor='#d11a29'" onmouseout="this.style.backgroundColor='#f4212e'">
                删除
              </button>
            </div>
          </div>
        `,
        )
        .join('');
    } catch (error) {
      console.error('加载NPC列表失败:', error);
      document.getElementById('npcs-list').innerHTML =
        '<p style="color: #f4212e; font-size: 14px; text-align: center; padding: 20px 0;">加载失败，请重试</p>';
    }
  }

  // 打开创建NPC弹窗
  function openCreateNPCModal() {
    currentEditingNPCId = null;

    // 清空表单
    document.getElementById('npc-name').value = '';
    document.getElementById('npc-handle').value = '';
    document.getElementById('npc-avatar').value = '';
    document.getElementById('npc-personality').value = '';
    document.getElementById('npc-posting-habits').value = '';
    document.getElementById('npc-homepage').value = '';

    // 更新标题
    document.getElementById('npc-modal-title').textContent = '创建NPC';

    // 加载用户列表
    loadNPCBindUsersList();

    // 显示弹窗
    document.getElementById('npc-edit-modal').style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  // 编辑NPC
  async function editNPC(npcId) {
    try {
      const db = getXDB();
      const npcDataId = 'xNPCs_global'; // 全局存储，所有账号共享
      const npcData = await db.xNPCs.get(npcDataId);
      const npcs = npcData?.npcs || [];
      const npc = npcs.find(n => n.id === npcId);

      if (!npc) {
        showXToast('NPC不存在', 'error');
        return;
      }

      currentEditingNPCId = npcId;

      // 填充表单
      document.getElementById('npc-name').value = npc.name || '';
      document.getElementById('npc-handle').value = npc.handle || '';
      document.getElementById('npc-avatar').value = npc.avatar || '';
      document.getElementById('npc-personality').value = npc.personality || '';
      document.getElementById('npc-posting-habits').value = npc.postingHabits || '';
      document.getElementById('npc-homepage').value = npc.homepage || '';

      // 更新标题
      document.getElementById('npc-modal-title').textContent = '编辑NPC';

      // 加载用户列表并选中已绑定的用户
      await loadNPCBindUsersList(npc.boundUsers || []);

      // 显示弹窗
      document.getElementById('npc-edit-modal').style.display = 'block';
      document.body.style.overflow = 'hidden';
    } catch (error) {
      console.error('加载NPC数据失败:', error);
      showXToast('加载失败', 'error');
    }
  }

  // 加载绑定用户列表
  async function loadNPCBindUsersList(selectedUsers = []) {
    try {
      const db = getXDB();
      const accounts = await db.xAccountList.toArray();

      const usersList = document.getElementById('npc-bind-users');

      if (accounts.length === 0) {
        usersList.innerHTML =
          '<p style="color: #71767b; font-size: 14px; text-align: center; padding: 10px 0;">暂无账号</p>';
        return;
      }

      usersList.innerHTML = accounts
        .map(account => {
          const isChecked = selectedUsers.includes(account.accountId);
          return `
          <label style="
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 8px;
            cursor: pointer;
            border-radius: 6px;
            transition: background-color 0.2s;
          " onmouseover="this.style.backgroundColor='rgba(255,255,255,0.05)'"
            onmouseout="this.style.backgroundColor='transparent'">
            <input 
              type="checkbox" 
              value="${account.accountId}" 
              ${isChecked ? 'checked' : ''}
              style="width: 16px; height: 16px; accent-color: #1d9bf0; cursor: pointer;">
            <img src="${account.avatar}" style="width: 32px; height: 32px; border-radius: 50%;" alt="${account.name}">
            <div style="flex: 1;">
              <div style="color: #fff; font-size: 14px; font-weight: 600;">${account.name}</div>
              <div style="color: #71767b; font-size: 13px;">账号ID: ${account.accountId}</div>
            </div>
          </label>
        `;
        })
        .join('');
    } catch (error) {
      console.error('加载用户列表失败:', error);
    }
  }

  // 保存NPC
  async function saveNPC() {
    try {
      const name = document.getElementById('npc-name').value.trim();
      const handle = document.getElementById('npc-handle').value.trim();
      const avatar = document.getElementById('npc-avatar').value.trim();
      const personality = document.getElementById('npc-personality').value.trim();
      const postingHabits = document.getElementById('npc-posting-habits').value.trim();
      const homepage = document.getElementById('npc-homepage').value.trim();

      // 获取选中的用户
      const boundUsers = Array.from(document.querySelectorAll('#npc-bind-users input[type="checkbox"]:checked')).map(
        input => input.value,
      );

      // 验证数据
      if (!name) {
        showXToast('NPC姓名不能为空', 'error');
        return;
      }

      if (!handle) {
        showXToast('NPC句柄不能为空', 'error');
        return;
      }

      // 确保句柄格式正确
      const handleFormatted = handle.startsWith('@') ? handle : `@${handle}`;

      const db = getXDB();
      const npcDataId = 'xNPCs_global'; // 全局存储，所有账号共享
      const npcData = await db.xNPCs.get(npcDataId);
      let npcs = npcData?.npcs || [];

      if (currentEditingNPCId) {
        // 编辑模式
        const index = npcs.findIndex(n => n.id === currentEditingNPCId);
        if (index !== -1) {
          npcs[index] = {
            ...npcs[index],
            name,
            handle: handleFormatted,
            avatar: avatar || 'https://i.postimg.cc/4xmx7V4R/mmexport1759081128356.jpg',
            personality,
            postingHabits,
            homepage,
            boundUsers,
            updatedAt: new Date().toISOString(),
          };
        }
      } else {
        // 创建模式
        const newNPC = {
          id: 'npc_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
          name,
          handle: handleFormatted,
          avatar: avatar || 'https://i.postimg.cc/4xmx7V4R/mmexport1759081128356.jpg',
          personality,
          postingHabits,
          homepage,
          boundUsers,
          createdAt: new Date().toISOString(),
        };
        npcs.push(newNPC);
      }

      // 保存到数据库
      await db.xNPCs.put({
        id: npcDataId,
        npcs,
        lastUpdated: new Date().toISOString(),
      });

      console.log(`✅ NPC已${currentEditingNPCId ? '更新' : '创建'}:`, name, handle);
      console.log('📎 绑定账号数量:', boundUsers.length);
      console.log('📎 绑定账号列表:', boundUsers.length > 0 ? boundUsers : '无');

      // 刷新列表
      await loadNPCsList();

      // 关闭弹窗
      closeNPCEditModal();

      showXToast(currentEditingNPCId ? 'NPC已更新' : 'NPC已创建', 'success');
    } catch (error) {
      console.error('保存NPC失败:', error);
      showXToast('保存失败: ' + error.message, 'error');
    }
  }

  // 删除NPC
  async function deleteNPC(npcId) {
    if (!confirm('确定要删除这个NPC吗？\n此操作将影响所有绑定了此NPC的账号。')) return;

    try {
      const db = getXDB();
      const npcDataId = 'xNPCs_global'; // 全局存储，所有账号共享
      const npcData = await db.xNPCs.get(npcDataId);
      let npcs = npcData?.npcs || [];

      npcs = npcs.filter(n => n.id !== npcId);

      await db.xNPCs.put({
        id: npcDataId,
        npcs,
        lastUpdated: new Date().toISOString(),
      });

      await loadNPCsList();

      showXToast('NPC已删除', 'success');
    } catch (error) {
      console.error('删除NPC失败:', error);
      showXToast('删除失败', 'error');
    }
  }

  // 关闭NPC编辑弹窗
  function closeNPCEditModal(event) {
    if (event && event.target !== event.currentTarget) return;

    document.getElementById('npc-edit-modal').style.display = 'none';
    document.body.style.overflow = 'auto';
    currentEditingNPCId = null;
  }

  // 用户主页相关功能

  // 切换主页标签
  function switchProfileTab(tabName) {
    // 重置所有标签样式
    document.querySelectorAll('.profile-tab').forEach(tab => {
      tab.classList.remove('active');
      tab.style.color = '#71767b';
      tab.querySelector('.tab-indicator').style.display = 'none';
    });

    // 隐藏所有内容区域
    document.querySelectorAll('.profile-tab-content').forEach(content => {
      content.style.display = 'none';
    });

    // 激活选中的标签
    const activeTab = document.querySelector(`.profile-tab[onclick="switchProfileTab('${tabName}')"]`);
    if (activeTab) {
      activeTab.classList.add('active');
      activeTab.style.color = '#fff';
      activeTab.querySelector('.tab-indicator').style.display = 'block';
    }

    // 显示对应的内容区域
    const contentArea = document.getElementById(`profile-${tabName}-content`);
    if (contentArea) {
      contentArea.style.display = 'block';
    }

    // 如果切换到帖子标签，加载用户推文
    if (tabName === 'posts') {
      loadUserProfileTweets();
    }
  }

  // 编辑个人资料
  function editProfile() {
    openEditProfileModal();
  }

  // 加载用户资料到UI
  function loadUserProfileToUI() {
    // 使用window.userProfileData确保读取最新数据
    const profile = window.userProfileData;

    // 更新顶栏头像
    const topBarAvatar = document.getElementById('top-bar-avatar');
    if (topBarAvatar) {
      topBarAvatar.src = profile.avatar;
    }

    // 更新主页信息
    const profileElements = {
      'x-profile-header-name': profile.name,
      'x-profile-user-name': profile.name,
      'x-profile-user-handle': profile.handle,
      'x-profile-bio': profile.bio,
      'x-profile-following-count': profile.following,
      'x-profile-followers-count': profile.followers,
    };

    Object.entries(profileElements).forEach(([id, value]) => {
      const element = document.getElementById(id);
      if (element) {
        element.textContent = value;
      }
    });

    // 更新自定义标签内容、图标和颜色
    const tag1Element = document.getElementById('x-profile-tag1');
    const tag1IconElement = document.getElementById('x-profile-tag1-icon');
    const tag2Element = document.getElementById('x-profile-tag2');
    const tag2IconElement = document.getElementById('x-profile-tag2-icon');

    if (tag1Element) {
      tag1Element.textContent = profile.customTag1;
      tag1Element.style.color = profile.customTag1Color || '#71767b';
    }
    if (tag1IconElement) {
      tag1IconElement.textContent = profile.customTag1Icon || '✨';
    }
    if (tag2Element) {
      tag2Element.textContent = profile.customTag2;
      tag2Element.style.color = profile.customTag2Color || '#71767b';
    }
    if (tag2IconElement) {
      tag2IconElement.textContent = profile.customTag2Icon || '📅';
    }

    // 更新头像
    const mainAvatar = document.getElementById('x-profile-main-avatar');
    if (mainAvatar) {
      mainAvatar.src = profile.avatar;
    }

    // 更新封面图
    const coverImage = document.getElementById('x-profile-cover-image');
    if (coverImage) {
      coverImage.src = profile.coverImage;
    }

    // 更新认证徽章
    updateVerificationBadge();

    // 更新评论输入区域的头像
    const commentInputAvatar = document.querySelector('#comment-input-area img, .comment-input-area img');
    if (commentInputAvatar) {
      commentInputAvatar.src = profile.avatar;
    }

    // 更新主页评论输入框头像
    const commentUserAvatar = document.getElementById('comment-user-avatar');
    if (commentUserAvatar) {
      commentUserAvatar.src = profile.avatar;
    }

    // 更新详情页评论输入框头像
    const detailCommentUserAvatar = document.getElementById('detail-comment-user-avatar');
    if (detailCommentUserAvatar) {
      detailCommentUserAvatar.src = profile.avatar;
    }

    // 更新所有回复输入框头像
    const replyUserAvatars = document.querySelectorAll('.reply-user-avatar');
    replyUserAvatars.forEach(avatar => {
      avatar.src = profile.avatar;
    });

    // 更新发帖弹窗头像
    const composeUserAvatar = document.getElementById('compose-user-avatar');
    if (composeUserAvatar) {
      composeUserAvatar.src = profile.avatar;
    }

    console.log('✅ UI已更新，当前用户资料:', profile.name);
  }

  // 更新认证徽章显示
  function updateVerificationBadge() {
    const verifiedBadge = document.getElementById('x-profile-verified-badge');
    if (!verifiedBadge) return;

    const verificationType = userProfileData.verificationType || 'none';

    // 如果是无认证，隐藏徽章
    if (verificationType === 'none') {
      verifiedBadge.style.display = 'none';
      return;
    }

    // 显示徽章
    verifiedBadge.style.display = 'inline-block';

    // 根据认证类型设置不同的图标和颜色
    let badgeColor = '#1d9bf0'; // 默认蓝色
    let badgePath = ''; // SVG路径

    switch (verificationType) {
      case 'verified':
        // 蓝色勾 - 已认证（保持原样）
        badgeColor = '#1d9bf0';
        badgePath =
          'M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.27 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.46 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z';
        break;
      case 'couple':
        // 简约白色心形 - 情侣认证
        badgeColor = '#ffffff';
        badgePath =
          'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z';
        break;
      case 'married':
        // 简约白色圆环 - 已婚认证
        badgeColor = '#ffffff';
        badgePath =
          'M12 4c4.42 0 8 3.58 8 8s-3.58 8-8 8-8-3.58-8-8 3.58-8 8-8zm0 2c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z';
        break;
      case 'vip':
        // 简约白色菱形 - VIP认证
        badgeColor = '#ffffff';
        badgePath = 'M12 3l6 6-6 6-6-6 6-6zm0 2.83L8.83 9 12 12.17 15.17 9 12 5.83z';
        break;
      default:
        // 默认蓝色勾
        badgeColor = '#1d9bf0';
        badgePath =
          'M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.27 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.46 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z';
        break;
    }

    // 更新徽章颜色和图标
    verifiedBadge.style.fill = badgeColor;

    // 更新SVG路径
    const pathElement = verifiedBadge.querySelector('path');
    if (pathElement) {
      pathElement.setAttribute('d', badgePath);
    }

    // 添加情侣认证的特殊提示
    if (verificationType === 'couple' && userProfileData.coupleCharacterName) {
      verifiedBadge.setAttribute('title', `情侣认证 - 与${userProfileData.coupleCharacterName}是情侣关系`);
    } else {
      // 设置其他认证类型的提示
      const titles = {
        verified: '已认证账户',
        married: '已婚认证',
        vip: 'VIP认证',
        couple: '情侣认证',
      };
      verifiedBadge.setAttribute('title', titles[verificationType] || '已认证账户');
    }
  }

  // 为角色设置情侣认证
  async function setCoupleVerificationForCharacter(characterId, userNameAsCouple) {
    try {
      const db = getXDB();
      // 获取角色的X资料
      let xProfile = await db.xCharacterProfiles.get(characterId);

      if (xProfile) {
        // 为角色设置情侣认证
        xProfile.xVerified = true;
        xProfile.verificationType = 'couple';
        xProfile.couplePartnerName = userNameAsCouple;

        // 保存更新
        await db.xCharacterProfiles.put(xProfile);

        console.log(`已为角色 ${xProfile.xName} 设置情侣认证，情侣对象: ${userNameAsCouple}`);
      }
    } catch (error) {
      console.error('为角色设置情侣认证失败:', error);
    }
  }

  // 同步用户头像到所有位置
  function syncUserAvatar(newAvatarUrl) {
    userProfileData.avatar = newAvatarUrl;

    // 更新所有头像位置
    const avatarSelectors = [
      '#top-bar-avatar',
      '#x-profile-main-avatar',
      '.comment-input-area img',
      '#comment-user-avatar',
      '#detail-comment-user-avatar',
      '#compose-user-avatar',
    ];

    avatarSelectors.forEach(selector => {
      const element = document.querySelector(selector);
      if (element) {
        element.src = newAvatarUrl;
      }
    });

    // 更新所有回复输入框头像
    document.querySelectorAll('.reply-user-avatar').forEach(avatar => {
      avatar.src = newAvatarUrl;
    });

    // 更新用户发布的评论中的头像
    document.querySelectorAll('.comment-item img[alt="我"], .comment-item img[alt="Your avatar"]').forEach(img => {
      img.src = newAvatarUrl;
    });
  }

  // 渲染用户的推文到主页
  function renderUserTweets() {
    const container = document.getElementById('x-profile-tweets-container');
    if (!container) return;

    // 获取用户发布的推文（这里简化为空，实际应该从数据中筛选）
    const userTweets = [];

    if (userTweets.length === 0) {
      container.innerHTML = `
                <div style="padding: 60px 32px; text-align: center;">
                  <div style="color: #71767b; font-size: 31px; font-weight: 800; margin-bottom: 8px;">还没有发帖</div>
                  <div style="color: #71767b; font-size: 15px;">当你发布推文时，它们会显示在这里。</div>
                </div>
              `;
    } else {
      container.innerHTML = '';
      userTweets.forEach(tweet => {
        const tweetElement = createTweetElement(tweet);
        container.appendChild(tweetElement);
      });
    }

    // 更新帖子数量
    const headerCount = document.getElementById('x-profile-header-count');
    if (headerCount) {
      headerCount.textContent = `${userTweets.length} 帖子`;
    }
  }

  // 多账户管理功能

  // 当前激活的账户ID
  let currentAccountId = 'main';

  // 切换个人主页菜单
  function toggleProfileMenu() {
    const menu = document.getElementById('profile-dropdown-menu');
    const isVisible = menu.style.display !== 'none';

    if (isVisible) {
      menu.style.display = 'none';
    } else {
      menu.style.display = 'block';
    }
  }

  // 点击其他地方关闭菜单
  document.addEventListener('click', function (event) {
    const menuBtn = document.getElementById('profile-menu-btn');
    const menu = document.getElementById('profile-dropdown-menu');

    if (!menuBtn || !menu) return;

    if (!menuBtn.contains(event.target) && !menu.contains(event.target)) {
      menu.style.display = 'none';
    }
  });

  // 打开账号管理弹窗
  async function openAccountManager() {
    // 关闭下拉菜单
    document.getElementById('profile-dropdown-menu').style.display = 'none';

    // 显示账号管理弹窗
    showAccountManagerModal();
  }

  // 显示账号管理弹窗
  async function showAccountManagerModal() {
    // 获取所有账户
    const accounts = await getAllAccounts();

    // 创建弹窗
    const modal = document.createElement('div');
    modal.id = 'account-manager-modal';
    modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            backdrop-filter: blur(4px);
            `;

    modal.innerHTML = `
            <div style="
                background-color: #1a1a1a;
                border-radius: 16px;
                width: 90%;
                max-width: 480px;
                max-height: 70vh;
                overflow-y: auto;
                border: 1px solid #333;
                position: relative;
              ">
              <!-- 弹窗头部 -->
              <div style="
                  padding: 20px;
                  border-bottom: 1px solid #333;
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  position: sticky;
                  top: 0;
                  background-color: #1a1a1a;
                  z-index: 10;
                ">
                <div>
                  <h3 style="margin: 0; color: #fff; font-size: 20px; font-weight: 700;">账号管理</h3>
                  <p style="margin: 4px 0 0; color: #71767b; font-size: 14px;">管理你的多个X账户</p>
                </div>
                <button onclick="closeAccountManager()" style="
                    background: transparent;
                    border: none;
                    color: #71767b;
                    cursor: pointer;
                    padding: 8px;
                    border-radius: 50%;
                    transition: background-color 0.2s;
                  " onmouseover="this.style.backgroundColor='rgba(255,255,255,0.1)'"
                  onmouseout="this.style.backgroundColor='transparent'">
                  <svg viewBox="0 0 24 24" style="width: 20px; height: 20px; fill: currentColor;">
                    <g><path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path></g>
                  </svg>
                </button>
              </div>

              <!-- 账户列表 -->
              <div style="padding: 20px;">
                <div id="accounts-list" style="margin-bottom: 20px;">
                  ${await renderAccountsList(accounts)}
                </div>

                <!-- 新建账户按钮 -->
                <button onclick="createNewAccount()" style="
                    width: 100%;
                    background-color: #1d9bf0;
                    color: #fff;
                    border: none;
                    border-radius: 12px;
                    padding: 16px;
                    font-size: 16px;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.2s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                  " onmouseover="this.style.backgroundColor='#1a8cd8'"
                  onmouseout="this.style.backgroundColor='#1d9bf0'">
                  <svg viewBox="0 0 24 24" style="width: 20px; height: 20px; fill: currentColor;">
                    <g><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></g>
                  </svg>
                  新建账户
                </button>
              </div>
            </div>
            `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    // 点击背景关闭弹窗
    modal.addEventListener('click', e => {
      if (e.target === modal) {
        closeAccountManager();
      }
    });
  }

  // 获取所有账户
  async function getAllAccounts() {
    try {
      const db = getXDB();
      const accounts = await db.xAccountList.orderBy('createdAt').toArray();
      const activeAccount = await db.xActiveAccount.get('current');

      // 如果没有账户记录，创建默认账户
      if (accounts.length === 0) {
        const defaultAccount = {
          accountId: 'main',
          name: userProfileData.name || '我',
          avatar: userProfileData.avatar || 'https://i.postimg.cc/pXxk1JXk/IMG-6442.jpg',
          createdAt: new Date().toISOString(),
          isActive: true,
        };
        await db.xAccountList.put(defaultAccount);
        await db.xActiveAccount.put({ id: 'current', accountId: 'main' });
        return [defaultAccount];
      }

      // 标记当前激活的账户
      accounts.forEach(account => {
        account.isActive = activeAccount && activeAccount.accountId === account.accountId;
      });

      return accounts;
    } catch (error) {
      console.error('获取账户列表失败:', error);
      return [];
    }
  }

  // 渲染账户列表
  async function renderAccountsList(accounts) {
    if (accounts.length === 0) {
      return `
            <div style="text-align: center; color: #71767b; padding: 40px 20px;">
              <div style="font-size: 16px; margin-bottom: 8px;">暂无账户</div>
              <div style="font-size: 14px;">创建你的第一个账户</div>
            </div>
            `;
    }

    return accounts
      .map(
        account => `
            <div style="
                border: 2px solid ${account.isActive ? '#1d9bf0' : '#333'};
                border-radius: 12px;
                padding: 16px;
                margin-bottom: 12px;
                cursor: pointer;
                transition: all 0.2s;
                background-color: ${account.isActive ? 'rgba(29, 155, 240, 0.05)' : 'transparent'};
              " onclick="switchAccount('${account.accountId}')"
              onmouseover="if (!${account.isActive}) this.style.borderColor='#536471'"
              onmouseout="if (!${account.isActive}) this.style.borderColor='#333'">
              <div style="display: flex; align-items: center; gap: 12px;">
                <img src="${account.avatar}" style="width: 48px; height: 48px; border-radius: 50%;" alt="${
          account.name
        }">
                  <div style="flex: 1;">
                    <div style="color: #fff; font-size: 16px; font-weight: 700; margin-bottom: 4px;">
                      ${account.name}
                      ${
                        account.isActive
                          ? '<span style="color: #1d9bf0; font-size: 12px; margin-left: 8px;">● 当前账户</span>'
                          : ''
                      }
                    </div>
                    <div style="color: #71767b; font-size: 14px;">
                      创建于 ${new Date(account.createdAt).toLocaleDateString('zh-CN')}
                    </div>
                  </div>
                  ${
                    !account.isActive && account.accountId !== 'main'
                      ? `
                    <button onclick="event.stopPropagation(); deleteAccount('${account.accountId}')" style="
                      background: transparent;
                      border: 1px solid #ef4444;
                      color: #ef4444;
                      border-radius: 8px;
                      padding: 6px 8px;
                      font-size: 12px;
                      cursor: pointer;
                      transition: all 0.2s;
                    " onmouseover="this.style.backgroundColor='rgba(239, 68, 68, 0.1)'" 
                       onmouseout="this.style.backgroundColor='transparent'">
                      删除
                    </button>
                  `
                      : ''
                  }
              </div>
            </div>
            `,
      )
      .join('');
  }

  // 关闭账号管理弹窗
  function closeAccountManager() {
    const modal = document.getElementById('account-manager-modal');
    if (modal) {
      modal.remove();
    }
    document.body.style.overflow = 'auto';
  }

  // 切换账户
  async function switchAccount(accountId) {
    if (accountId === currentAccountId) {
      closeAccountManager();
      return;
    }

    try {
      const db = getXDB();

      // 更新激活账户记录
      await db.xActiveAccount.put({ id: 'current', accountId: accountId });

      // 更新当前账户ID
      currentAccountId = accountId;

      // 加载新账户的数据
      await loadUserProfileFromDB(accountId);

      // 重新加载 X 设置（按账号加载）
      await initializeXSettings();

      // 更新UI显示
      loadUserProfileToUI();

      // 同步头像到所有位置
      syncUserAvatar(userProfileData.avatar);

      // 重新加载个人主页推文（按账户隔离）
      if (document.getElementById('x-profile-page').style.display !== 'none') {
        loadUserProfileTweets();
      }

      // 更新发帖弹窗的用户信息
      const composeAvatar = document.getElementById('compose-user-avatar');
      if (composeAvatar) {
        composeAvatar.src = userProfileData.avatar;
      }

      // 关闭弹窗
      closeAccountManager();

      showXToast(`已切换到账户：${userProfileData.name}`, 'success');
      console.log('✅ 已切换账户，绑定角色数:', xSettingsData.boundCharacters?.length || 0);
    } catch (error) {
      console.error('切换账户失败:', error);
      showXToast('切换账户失败', 'error');
    }
  }

  // 创建新账户
  async function createNewAccount() {
    try {
      const db = getXDB();

      // 生成新的账户ID
      const newAccountId = 'account_' + Date.now();

      // 使用统一的默认用户资料配置
      const defaultProfile = getDefaultUserProfile(newAccountId);

      // 保存新账户的用户资料
      await db.xUserProfile.put(defaultProfile);

      // 添加到账户列表
      const newAccount = {
        accountId: newAccountId,
        name: '新用户',
        avatar: 'https://i.postimg.cc/pXxk1JXk/IMG-6442.jpg',
        createdAt: new Date().toISOString(),
      };
      await db.xAccountList.put(newAccount);

      // 自动切换到新账户
      await switchAccount(newAccountId);
    } catch (error) {
      console.error('创建新账户失败:', error);
      showXToast('创建新账户失败', 'error');
    }
  }

  // 删除账户
  async function deleteAccount(accountId) {
    if (accountId === 'main') {
      showXToast('无法删除默认账户', 'error');
      return;
    }

    if (!confirm('确定要删除这个账户吗？此操作无法撤销。')) {
      return;
    }

    try {
      const db = getXDB();

      // 删除账户的用户资料
      await db.xUserProfile.delete(accountId);

      // 从账户列表中删除
      await db.xAccountList.delete(accountId);

      showXToast('账户已删除', 'success');

      // 重新显示账户管理弹窗
      closeAccountManager();
      setTimeout(() => {
        showAccountManagerModal();
      }, 300);
    } catch (error) {
      console.error('删除账户失败:', error);
      showXToast('删除账户失败', 'error');
    }
  }

  // 初始化用户主页
  async function initializeUserProfile() {
    // 首先加载当前激活的账户
    await loadActiveAccount();
    await loadUserProfileFromDB();
    loadUserProfileToUI();

    // 同步头像到所有位置
    syncUserAvatar(userProfileData.avatar);

    // 加载当前账户的推文
    loadUserProfileTweets();
  }

  // 加载当前激活的账户
  async function loadActiveAccount() {
    try {
      const db = getXDB();

      // 初始化多账户系统
      await initializeMultiAccountSystem();

      const activeAccount = await db.xActiveAccount.get('current');
      if (activeAccount) {
        currentAccountId = activeAccount.accountId;
      } else {
        // 如果没有激活账户记录，使用默认账户
        currentAccountId = 'main';
        await db.xActiveAccount.put({ id: 'current', accountId: 'main' });
      }
    } catch (error) {
      console.error('加载激活账户失败:', error);
      currentAccountId = 'main';
    }
  }

  // 初始化多账户系统
  async function initializeMultiAccountSystem() {
    try {
      const db = getXDB();

      // 检查是否存在默认账户记录
      const defaultAccount = await db.xAccountList.get('main');
      if (!defaultAccount) {
        // 从现有的用户资料创建默认账户记录
        const existingProfile = await db.xUserProfile.get('main');
        const defaultAccountData = {
          accountId: 'main',
          name: existingProfile?.name || '我',
          avatar: existingProfile?.avatar || 'https://i.postimg.cc/pXxk1JXk/IMG-6442.jpg',
          createdAt: existingProfile?.lastUpdated || new Date().toISOString(),
        };
        await db.xAccountList.put(defaultAccountData);
        console.log('已创建默认账户记录');
      }

      // 确保有激活账户记录
      const activeAccount = await db.xActiveAccount.get('current');
      if (!activeAccount) {
        await db.xActiveAccount.put({ id: 'current', accountId: 'main' });
        console.log('已设置默认激活账户');
      }
    } catch (error) {
      console.error('初始化多账户系统失败:', error);
    }
  }

  // 从数据库加载用户资料（多账户系统专用）
  async function loadUserProfileFromDB(accountId = null) {
    try {
      const db = getXDB();
      const targetAccountId = accountId || currentAccountId || 'main';
      const savedProfile = await db.xUserProfile.get(targetAccountId);

      if (savedProfile) {
        // 更新现有对象的属性（保持引用一致）
        Object.assign(window.userProfileData, savedProfile);
      } else {
        // 如果没有找到用户资料，使用默认值（新账户的情况）
        console.log('⚠️ 未找到账户资料，使用默认值:', targetAccountId);
        const defaultProfile = getDefaultUserProfile(targetAccountId);
        Object.assign(window.userProfileData, defaultProfile);
      }

      // 确保所有必要字段存在（使用统一的字段验证）
      ensureProfileFields(window.userProfileData);

      console.log('✅ 已加载用户资料数据:', targetAccountId);
      if (window.userProfileData.knownIdentityCharacters && window.userProfileData.knownIdentityCharacters.length > 0) {
        console.log('📌 已知身份角色数量:', window.userProfileData.knownIdentityCharacters.length);
      }
    } catch (error) {
      console.error('❌ 加载用户资料失败，使用默认数据:', error);
      const defaultProfile = getDefaultUserProfile('main');
      Object.assign(window.userProfileData, defaultProfile);
    }
  }

  // 保存用户资料到数据库
  async function saveUserProfileToDB() {
    try {
      const db = getXDB();
      const targetAccountId = currentAccountId || 'main';

      await db.xUserProfile.put({
        id: targetAccountId,
        ...window.userProfileData, // 使用window.userProfileData确保使用最新数据
        lastUpdated: new Date().toISOString(),
      });

      // 同时更新账户列表中的基本信息
      const existingAccount = await db.xAccountList.get(targetAccountId);
      if (existingAccount) {
        existingAccount.name = window.userProfileData.name;
        existingAccount.avatar = window.userProfileData.avatar;
        await db.xAccountList.put(existingAccount);
      }

      console.log('用户资料已保存到数据库，账户ID:', targetAccountId);
      if (window.userProfileData.knownIdentityCharacters && window.userProfileData.knownIdentityCharacters.length > 0) {
        console.log('已知身份角色:', window.userProfileData.knownIdentityCharacters.length + '个');
      }
    } catch (error) {
      console.error('保存用户资料失败:', error);
      throw error;
    }
  }

  // 编辑个人资料弹窗相关功能

  // 打开编辑个人资料弹窗
  function openEditProfileModal() {
    const modal = document.getElementById('edit-profile-modal');
    modal.style.display = 'flex';

    // 禁止背景滚动
    document.body.style.overflow = 'hidden';

    // 加载当前数据到编辑表单
    loadDataToEditForm();
  }

  // 关闭编辑个人资料弹窗
  function closeEditProfileModal(event) {
    // 如果有事件参数，检查是否点击的是背景区域
    if (event && event.target !== event.currentTarget) {
      return;
    }

    const modal = document.getElementById('edit-profile-modal');
    modal.style.display = 'none';

    // 恢复背景滚动
    document.body.style.overflow = 'auto';
  }

  // 加载当前用户数据到编辑表单
  function loadDataToEditForm() {
    // 使用window.userProfileData确保读取最新数据
    const profile = window.userProfileData;

    // 加载基本信息
    document.getElementById('edit-user-name').value = profile.name;
    document.getElementById('edit-user-handle').value = profile.handle.replace('@', '');
    document.getElementById('edit-user-bio').value = profile.bio;
    document.getElementById('edit-custom-tag1').value = profile.customTag1;
    document.getElementById('edit-custom-tag2').value = profile.customTag2;
    document.getElementById('edit-following-count').value = profile.following;
    document.getElementById('edit-followers-count').value = profile.followers;

    // 加载标签图标和颜色
    document.getElementById('edit-tag1-icon').value = profile.customTag1Icon || '✨';
    document.getElementById('edit-tag2-icon').value = profile.customTag2Icon || '📅';
    document.getElementById('edit-tag1-color').value = profile.customTag1Color || '#71767b';
    document.getElementById('edit-tag2-color').value = profile.customTag2Color || '#71767b';
    document.getElementById('edit-tag1-color-text').value = profile.customTag1Color || '#71767b';
    document.getElementById('edit-tag2-color-text').value = profile.customTag2Color || '#71767b';

    // 加载图片
    document.getElementById('edit-cover-image').src = profile.coverImage;
    document.getElementById('edit-main-avatar').src = profile.avatar;

    // 加载公众身份和真名设置
    document.getElementById('edit-public-identity').value = profile.publicIdentity || '';
    document.getElementById('edit-show-real-name').checked = profile.showRealName || false;
    document.getElementById('edit-real-name').value = profile.realName || '';

    // 根据复选框状态显示/隐藏真名输入框
    toggleRealNameInput();

    // 更新字符计数
    updateCharacterCounts();

    // 加载认证类型设置
    loadVerificationTypeData();

    // 加载角色身份识别设置
    loadIdentityCharactersList();

    console.log('✅ 已加载用户数据到编辑表单');
  }

  // 加载认证类型数据到编辑表单
  function loadVerificationTypeData() {
    // 使用window.userProfileData确保读取最新数据
    const profile = window.userProfileData;

    // 设置认证类型选择
    const verificationTypeSelect = document.getElementById('edit-verification-type');
    if (verificationTypeSelect) {
      verificationTypeSelect.value = profile.verificationType || 'none';
    }

    // 设置情侣绑定角色
    const coupleCharacterSelect = document.getElementById('edit-couple-character');
    if (coupleCharacterSelect) {
      coupleCharacterSelect.value = profile.coupleCharacterId || '';
    }

    // 加载可选择的角色到情侣绑定下拉框
    loadCoupleCharacterOptions();

    // 更新UI显示
    updateVerificationTypeUI();
  }

  // 更新认证类型UI显示
  function updateVerificationTypeUI() {
    const verificationTypeSelect = document.getElementById('edit-verification-type');
    const coupleBindingSection = document.getElementById('couple-binding-section');

    if (!verificationTypeSelect || !coupleBindingSection) return;

    const selectedType = verificationTypeSelect.value;

    // 根据选择的认证类型显示/隐藏情侣绑定选项
    if (selectedType === 'couple') {
      coupleBindingSection.style.display = 'block';
    } else {
      coupleBindingSection.style.display = 'none';
    }
  }

  // 加载可选择的角色到情侣绑定下拉框
  async function loadCoupleCharacterOptions() {
    try {
      const db = getDB(); // chats表在主数据库中
      const xDb = getXDB(); // X资料在X专用数据库中

      // 获取所有聊天角色
      const allChats = await db.chats.toArray();
      const characters = allChats.filter(chat => !chat.isGroup);

      const coupleCharacterSelect = document.getElementById('edit-couple-character');
      if (!coupleCharacterSelect) return;

      // 清空现有选项（保留默认选项）
      coupleCharacterSelect.innerHTML =
        '<option value="" style="background-color: #000; color: #fff;">未选择角色</option>';

      // 获取所有角色的X资料（从X专用数据库）
      const characterProfiles = await xDb.xCharacterProfiles.toArray();
      const profileMap = new Map();
      characterProfiles.forEach(profile => {
        profileMap.set(profile.characterId, profile);
      });

      // 添加角色选项
      characters.forEach(character => {
        const option = document.createElement('option');
        option.value = character.id;

        // 优先使用X平台名称，如果没有设置则使用角色名
        const xProfile = profileMap.get(character.id);
        const displayName = xProfile?.xName || character.name;

        option.textContent = displayName;
        option.style.backgroundColor = '#000';
        option.style.color = '#fff';
        coupleCharacterSelect.appendChild(option);
      });

      // 设置当前选中的角色
      if (userProfileData.coupleCharacterId) {
        coupleCharacterSelect.value = userProfileData.coupleCharacterId;
      }
    } catch (error) {
      console.error('加载情侣角色选项失败:', error);
    }
  }

  // 更新字符计数显示
  function updateCharacterCounts() {
    const nameInput = document.getElementById('edit-user-name');
    const handleInput = document.getElementById('edit-user-handle');
    const bioInput = document.getElementById('edit-user-bio');
    const tag1Input = document.getElementById('edit-custom-tag1');
    const tag2Input = document.getElementById('edit-custom-tag2');

    // 更新名称计数
    if (nameInput) {
      const nameCount = nameInput.value.length;
      nameInput.parentNode.querySelector('div').textContent = `${nameCount} / 50`;
    }

    // 更新用户名计数
    if (handleInput) {
      const handleCount = handleInput.value.length;
      handleInput.parentNode.querySelector('div').textContent = `${handleCount} / 15`;
    }

    // 更新简介计数
    if (bioInput) {
      const bioCount = bioInput.value.length;
      bioInput.parentNode.querySelector('div').textContent = `${bioCount} / 160`;
    }

    // 更新标签1计数
    if (tag1Input) {
      const tag1Count = tag1Input.value.length;
      const tag1Container = tag1Input.closest('.form-group');
      const countDiv = tag1Container.querySelector('div:last-child');
      countDiv.textContent = `${tag1Count} / 30`;
    }

    // 更新标签2计数
    if (tag2Input) {
      const tag2Count = tag2Input.value.length;
      const tag2Container = tag2Input.closest('.form-group');
      const countDiv = tag2Container.querySelector('div:last-child');
      countDiv.textContent = `${tag2Count} / 30`;
    }

    // 公众身份已移除字符限制，无需计数

    // 更新真实姓名计数
    const realNameInput = document.getElementById('edit-real-name');
    if (realNameInput) {
      const realNameCount = realNameInput.value.length;
      realNameInput.parentNode.querySelector('div').textContent = `${realNameCount} / 50`;
    }
  }

  // 切换真名输入框显示
  function toggleRealNameInput() {
    const checkbox = document.getElementById('edit-show-real-name');
    const container = document.getElementById('real-name-input-container');

    // 添加 null 检查，防止元素不存在时报错
    if (!checkbox || !container) {
      console.warn('用户真名相关元素未找到');
      return;
    }

    if (checkbox.checked) {
      container.style.display = 'block';
    } else {
      container.style.display = 'none';
      // 清空真名输入框
      const realNameInput = document.getElementById('edit-real-name');
      if (realNameInput) {
        realNameInput.value = '';
        updateCharacterCounts();
      }
    }
  }

  // 切换角色真名输入框显示
  function toggleCharacterRealNameInput() {
    const checkbox = document.getElementById('character-show-real-name');
    const container = document.getElementById('character-real-name-input-container');

    // 添加 null 检查，防止元素不存在时报错
    if (!checkbox || !container) {
      console.warn('角色真名相关元素未找到');
      return;
    }

    if (checkbox.checked) {
      container.style.display = 'block';
    } else {
      container.style.display = 'none';
      // 清空真名输入框
      const realNameInput = document.getElementById('character-real-name');
      if (realNameInput) {
        realNameInput.value = '';
        updateCharacterXProfileCounts();
      }
    }
  }

  // 标签1颜色同步功能
  function updateTag1ColorFromText() {
    const colorText = document.getElementById('edit-tag1-color-text');
    const colorPicker = document.getElementById('edit-tag1-color');

    if (colorText && colorPicker) {
      const colorValue = colorText.value.trim();
      if (colorValue.match(/^#[0-9A-Fa-f]{6}$/)) {
        colorPicker.value = colorValue;
      }
    }
  }

  function updateTag1ColorFromPicker() {
    const colorText = document.getElementById('edit-tag1-color-text');
    const colorPicker = document.getElementById('edit-tag1-color');

    if (colorText && colorPicker) {
      colorText.value = colorPicker.value;
    }
  }

  // 标签2颜色同步功能
  function updateTag2ColorFromText() {
    const colorText = document.getElementById('edit-tag2-color-text');
    const colorPicker = document.getElementById('edit-tag2-color');

    if (colorText && colorPicker) {
      const colorValue = colorText.value.trim();
      if (colorValue.match(/^#[0-9A-Fa-f]{6}$/)) {
        colorPicker.value = colorValue;
      }
    }
  }

  function updateTag2ColorFromPicker() {
    const colorText = document.getElementById('edit-tag2-color-text');
    const colorPicker = document.getElementById('edit-tag2-color');

    if (colorText && colorPicker) {
      colorText.value = colorPicker.value;
    }
  }

  // 简化的关注数处理 - 直接使用字符串
  function getFollowCountValue(input) {
    if (!input) return '';
    return input.toString().trim();
  }

  // 编辑封面图
  // 编辑封面图 - 使用链接上传
  function editCoverImage() {
    const currentCover = document.getElementById('edit-cover-image').src;
    const coverUrl = prompt('请输入封面图片链接：', currentCover);

    if (coverUrl === null) return; // 用户点击取消

    if (!coverUrl.trim()) {
      showXToast('请输入有效的图片链接', 'error');
      return;
    }

    // 验证是否为有效的URL
    try {
      new URL(coverUrl);
    } catch (e) {
      showXToast('请输入有效的图片链接', 'error');
      return;
    }

    // 测试图片是否可以加载
    const testImg = new Image();
    testImg.onload = function () {
      document.getElementById('edit-cover-image').src = coverUrl;
      showXToast('封面图已更新', 'success');
    };
    testImg.onerror = function () {
      showXToast('无法加载该图片，请检查链接是否正确', 'error');
    };
    testImg.src = coverUrl;
  }

  // 移除封面图
  function removeCoverImage() {
    const defaultCover = 'https://i.postimg.cc/qRzMB6nQ/default-cover.jpg';
    document.getElementById('edit-cover-image').src = defaultCover;
    showXToast('已移除封面图', 'success');
  }

  // 编辑头像 - 使用链接上传
  function editAvatarImage() {
    const currentAvatar = document.getElementById('edit-main-avatar').src;
    const avatarUrl = prompt('请输入头像图片链接：', currentAvatar);

    if (avatarUrl === null) return; // 用户点击取消

    if (!avatarUrl.trim()) {
      showXToast('请输入有效的图片链接', 'error');
      return;
    }

    // 验证是否为有效的URL
    try {
      new URL(avatarUrl);
    } catch (e) {
      showXToast('请输入有效的图片链接', 'error');
      return;
    }

    // 测试图片是否可以加载
    const testImg = new Image();
    testImg.onload = function () {
      document.getElementById('edit-main-avatar').src = avatarUrl;
      showXToast('头像已更新', 'success');
    };
    testImg.onerror = function () {
      showXToast('无法加载该图片，请检查链接是否正确', 'error');
    };
    testImg.src = avatarUrl;
  }

  // 角色身份识别管理函数

  // 加载已绑定X资料的角色列表
  async function loadIdentityCharactersList() {
    try {
      const db = getDB(); // 修正：chats表在全局数据库中
      const xDb = getXDB(); // X专用数据库用于其他数据

      // 获取X设置中的绑定角色（使用当前账号的设置）
      const settingsId = `xSettings_${currentAccountId || 'main'}`;
      const xSettings = await xDb.xSettings.get(settingsId);
      const boundCharacters = xSettings?.boundCharacters || [];

      if (boundCharacters.length === 0) {
        renderIdentityCharactersList([]);
        return;
      }

      // 获取所有聊天角色
      const allChats = await db.chats.toArray();
      const characters = allChats.filter(chat => !chat.isGroup && boundCharacters.includes(chat.id));

      // 筛选出已绑定X资料的角色
      const charactersWithXProfile = [];
      for (const character of characters) {
        const xProfile = await xDb.xCharacterProfiles.get(character.id);
        if (xProfile) {
          charactersWithXProfile.push({
            id: character.id,
            name: character.name,
            originalName: character.originalName,
            xProfile: xProfile,
          });
        }
      }

      renderIdentityCharactersList(charactersWithXProfile);
    } catch (error) {
      console.error('加载角色身份识别列表失败:', error);
      renderIdentityCharactersList([]);
    }
  }

  // 渲染角色身份识别列表
  function renderIdentityCharactersList(characters) {
    const container = document.getElementById('identity-characters-list');

    if (characters.length === 0) {
      container.innerHTML = `
                <div style="text-align: center; color: #71767b; font-size: 13px; padding: 20px;">
                  暂无已绑定X资料的角色<br>
                  <span style="font-size: 12px; margin-top: 4px; display: block;">
                    请先在X设置中绑定角色并设置X资料
                  </span>
                </div>
              `;
      return;
    }

    // 确保knownIdentityCharacters数组存在
    if (!userProfileData.knownIdentityCharacters) {
      userProfileData.knownIdentityCharacters = [];
    }

    container.innerHTML = characters
      .map(character => {
        const isSelected = userProfileData.knownIdentityCharacters.includes(character.id);
        return `
                <div style="display: flex; align-items: center; gap: 12px; padding: 8px; border-radius: 6px; margin-bottom: 6px; cursor: pointer; transition: background-color 0.2s;" 
                     onmouseover="this.style.backgroundColor='rgba(255,255,255,0.05)'" 
                     onmouseout="this.style.backgroundColor='transparent'"
                     onclick="toggleIdentityCharacter('${character.id}')">
                  
                  <!-- 复选框 -->
                  <div style="
                    width: 18px;
                    height: 18px;
                    border: 2px solid ${isSelected ? '#1d9bf0' : '#71767b'};
                    border-radius: 3px;
                    background-color: ${isSelected ? '#1d9bf0' : 'transparent'};
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s;
                    flex-shrink: 0;
                  ">
                    ${
                      isSelected
                        ? '<svg viewBox="0 0 24 24" style="width: 12px; height: 12px; fill: #fff;"><path d="M9 16.17L5.53 12.7l-1.06 1.06L9 18.3l9.54-9.54-1.06-1.06L9 16.17z"/></svg>'
                        : ''
                    }
                  </div>

                                    <!-- 角色头像 -->
                  <img src="${character.xProfile.xAvatar}" alt="${character.xProfile.xName}" 
                       style="width: 32px; height: 32px; border-radius: 50%; flex-shrink: 0;">

                  <!-- 角色信息 -->
                  <div style="flex: 1; min-width: 0;">
                    <div style="color: #fff; font-weight: 600; font-size: 14px;">
                      ${character.xProfile.xName}
                      ${
                        character.xProfile.xVerified
                          ? '<svg viewBox="0 0 24 24" style="width: 14px; height: 14px; fill: #1d9bf0; margin-left: 4px; display: inline;"><path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-2.5-1.668c-.326-.217-.413-.656-.196-.982.217-.326.656-.414.982-.196l1.875 1.25 3.75-5.625c.22-.33.66-.418.99-.196.33.22.418.66.196.99z"/></svg>'
                          : ''
                      }
                    </div>
                    <div style="color: #71767b; font-size: 12px;">
                      ${character.xProfile.xHandle} • ${character.name}
                                            ${
                                              character.xProfile &&
                                              character.xProfile.userPersona &&
                                              character.xProfile.userPersona.trim()
                                                ? '<span style="color: #10b981; font-size: 11px; margin-left: 8px;">✓ 已设置人设</span>'
                                                : '<span style="color: #f59e0b; font-size: 11px; margin-left: 8px;">⚠ 未设置人设</span>'
                                            }
                    </div>
                  </div>

                  <!-- 设置用户人设按钮 -->
                  <div class="persona-setting-btn" onclick="event.stopPropagation(); window.openUserPersonaEditor('${
                    character.id
                  }')" 
                       style="
                         width: 32px;
                         height: 32px;
                         border-radius: 50%;
                         background-color: ${
                           character.xProfile && character.xProfile.userPersona && character.xProfile.userPersona.trim()
                             ? '#10b981'
                             : '#1d9bf0'
                         };
                         color: #fff;
                         display: flex;
                         align-items: center;
                         justify-content: center;
                         cursor: pointer;
                         flex-shrink: 0;
                         transition: all 0.2s;
                         margin-left: 8px;
                       "
                       onmouseover="this.style.backgroundColor='${
                         character.xProfile && character.xProfile.userPersona && character.xProfile.userPersona.trim()
                           ? '#059669'
                           : '#1a8cd8'
                       }'; this.style.transform='scale(1.05)'"
                       onmouseout="this.style.backgroundColor='${
                         character.xProfile && character.xProfile.userPersona && character.xProfile.userPersona.trim()
                           ? '#10b981'
                           : '#1d9bf0'
                       }'; this.style.transform='scale(1)'"
                       title="${
                         character.xProfile && character.xProfile.userPersona && character.xProfile.userPersona.trim()
                           ? '编辑用户人设'
                           : '设置用户人设'
                       }">
                    ${
                      character.xProfile && character.xProfile.userPersona && character.xProfile.userPersona.trim()
                        ? '<svg viewBox="0 0 24 24" style="width: 16px; height: 16px; fill: currentColor;"><g><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></g></svg>'
                        : '<svg viewBox="0 0 24 24" style="width: 16px; height: 16px; fill: currentColor;"><g><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></g></svg>'
                    }
                  </div>
                </div>
              `;
      })
      .join('');
  }

  // 切换角色身份识别状态
  function toggleIdentityCharacter(characterId) {
    // 确保knownIdentityCharacters数组存在
    if (!userProfileData.knownIdentityCharacters) {
      userProfileData.knownIdentityCharacters = [];
    }

    const index = userProfileData.knownIdentityCharacters.indexOf(characterId);
    if (index === -1) {
      // 添加到已知身份列表
      userProfileData.knownIdentityCharacters.push(characterId);
    } else {
      // 从已知身份列表中移除
      userProfileData.knownIdentityCharacters.splice(index, 1);
    }

    // 重新渲染列表以更新UI
    loadIdentityCharactersList();
  }

  // 用户人设编辑功能 - 使用+按钮触发

  // 打开用户人设编辑器 - 全局函数
  window.openUserPersonaEditor = async function (characterId) {
    try {
      const mainDB = getDB(); // 用于访问 chats 表
      const xDB = getXDB(); // 用于访问 xCharacterProfiles 表

      const chat = await mainDB.chats.get(characterId);
      const xProfile = await xDB.xCharacterProfiles.get(characterId);

      if (!chat || !xProfile) {
        showXToast('无法获取角色信息', 'error');
        return;
      }

      // 获取现有的用户人设（如果有的话）
      const existingPersona = xProfile.userPersona || '';

      // 显示编辑弹窗
      window.showUserPersonaModal(characterId, chat.name, xProfile.xName, existingPersona);
    } catch (error) {
      console.error('打开用户人设编辑器失败:', error);
      showXToast('打开编辑器失败', 'error');
    }
  };

  // 显示用户人设编辑弹窗 - 全局函数
  window.showUserPersonaModal = function (characterId, characterName, xName, existingPersona) {
    const modal = document.createElement('div');
    modal.id = 'user-persona-modal';
    modal.style.cssText = `
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background-color: rgba(0, 0, 0, 0.8);
              display: flex;
              align-items: center;
              justify-content: center;
              z-index: 10000;
              backdrop-filter: blur(4px);
            `;

    modal.innerHTML = `
              <div style="
                background-color: #1a1a1a;
                border-radius: 16px;
                width: 90%;
                max-width: 500px;
                max-height: 80vh;
                overflow-y: auto;
                position: relative;
                border: 1px solid #333;
              ">
                <!-- 弹窗头部 -->
                <div style="
                  padding: 20px;
                  border-bottom: 1px solid #333;
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                ">
                  <div>
                    <h3 style="margin: 0; color: #fff; font-size: 18px; font-weight: 700;">
                      编辑用户人设
                    </h3>
                    <p style="margin: 4px 0 0; color: #71767b; font-size: 14px;">
                      为 ${xName} (${characterName}) 设置你的身份信息
                    </p>
                  </div>
                  <button onclick="window.closeUserPersonaModal()" style="
                    background: transparent;
                    border: none;
                    color: #71767b;
                    cursor: pointer;
                    padding: 8px;
                    border-radius: 50%;
                    transition: background-color 0.2s;
                  " onmouseover="this.style.backgroundColor='rgba(255,255,255,0.1)'" 
                     onmouseout="this.style.backgroundColor='transparent'">
                    <svg viewBox="0 0 24 24" style="width: 20px; height: 20px; fill: currentColor;">
                      <g><path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path></g>
                    </svg>
                  </button>
                </div>

                <!-- 弹窗内容 -->
                <div style="padding: 20px;">
                  <!-- 说明文字 -->
                  <div style="
                    background-color: #003d82;
                    border: 1px solid #1d9bf0;
                    border-radius: 8px;
                    padding: 12px;
                    margin-bottom: 20px;
                  ">
                    <div style="color: #1d9bf0; font-size: 14px; font-weight: 600; margin-bottom: 4px;">
                      💡 如何设置用户人设
                    </div>
                    <div style="color: #e1e8ed; font-size: 13px; line-height: 1.4;">
                      • 描述你希望这个角色了解的关于你的信息<br>
                      • 例如：性格特点、兴趣爱好、职业背景等<br>
                      • 这些信息将帮助角色更自然地与你互动
                    </div>
                  </div>

                  <!-- 用户人设输入 -->
                  <div style="margin-bottom: 20px;">
                    <label style="
                      display: block;
                      color: #fff;
                      font-size: 15px;
                      font-weight: 600;
                      margin-bottom: 8px;
                    ">用户人设</label>
                    <textarea id="user-persona-input" placeholder="请描述你希望${xName}了解的关于你的信息..." style="
                      width: 100%;
                      min-height: 120px;
                      max-height: 300px;
                      background-color: #0a0a0a;
                      border: 1px solid #333;
                      border-radius: 8px;
                      color: #fff;
                      font-size: 14px;
                      padding: 12px;
                      resize: vertical;
                      outline: none;
                      box-sizing: border-box;
                      font-family: inherit;
                      line-height: 1.4;
                    " oninput="window.updatePersonaCharCount()">${existingPersona}</textarea>
                    <div style="
                      display: flex;
                      justify-content: space-between;
                      align-items: center;
                      margin-top: 8px;
                    ">
                      <div style="color: #71767b; font-size: 12px;">
                        建议详细描述，帮助角色更好地理解你
                      </div>
                      <div id="persona-char-count" style="color: #71767b; font-size: 12px;">
                        ${existingPersona.length} 字符
                      </div>
                    </div>
                  </div>

                  <!-- 操作按钮 -->
                  <div style="display: flex; gap: 12px; justify-content: flex-end;">
                    <button onclick="window.closeUserPersonaModal()" style="
                      background: transparent;
                      color: #71767b;
                      border: 1px solid #333;
                      border-radius: 20px;
                      padding: 8px 20px;
                      font-size: 15px;
                      font-weight: 700;
                      cursor: pointer;
                      transition: all 0.2s;
                    " onmouseover="this.style.backgroundColor='rgba(255,255,255,0.05)'" 
                       onmouseout="this.style.backgroundColor='transparent'">
                      取消
                    </button>
                    <button onclick="window.saveUserPersona('${characterId}')" style="
                      background-color: #1d9bf0;
                      color: #fff;
                      border: none;
                      border-radius: 20px;
                      padding: 8px 20px;
                      font-size: 15px;
                      font-weight: 700;
                      cursor: pointer;
                      transition: all 0.2s;
                    " onmouseover="this.style.backgroundColor='#1a8cd8'" 
                       onmouseout="this.style.backgroundColor='#1d9bf0'">
                      保存
                    </button>
                  </div>
                </div>
              </div>
            `;

    document.body.appendChild(modal);

    // 点击背景关闭弹窗
    modal.addEventListener('click', e => {
      if (e.target === modal) {
        window.closeUserPersonaModal();
      }
    });
  };

  // 更新字符计数 - 全局函数
  window.updatePersonaCharCount = function () {
    const textarea = document.getElementById('user-persona-input');
    const countEl = document.getElementById('persona-char-count');
    if (textarea && countEl) {
      countEl.textContent = `${textarea.value.length} 字符`;
    }
  };

  // 关闭用户人设编辑弹窗 - 全局函数
  window.closeUserPersonaModal = function () {
    const modal = document.getElementById('user-persona-modal');
    if (modal) {
      modal.remove();
    }
  };

  // 保存用户人设 - 全局函数
  window.saveUserPersona = async function (characterId) {
    const textarea = document.getElementById('user-persona-input');
    const persona = textarea.value.trim();

    try {
      const db = getXDB();

      // 获取现有的角色X资料
      let xProfile = await db.xCharacterProfiles.get(characterId);

      if (xProfile) {
        // 更新用户人设
        xProfile.userPersona = persona;
        await db.xCharacterProfiles.put(xProfile);

        console.log(
          `已保存角色 ${characterId} 的用户人设:`,
          persona.substring(0, 100) + (persona.length > 100 ? '...' : ''),
        );

        showXToast(persona ? '用户人设已保存' : '用户人设已清空', 'success');
        window.closeUserPersonaModal();
      } else {
        showXToast('无法找到角色资料', 'error');
      }
    } catch (error) {
      console.error('保存用户人设失败:', error);
      showXToast('保存失败', 'error');
    }
  };

  // 保存个人资料更改
  async function saveProfileChanges() {
    // 获取表单数据
    const newName = document.getElementById('edit-user-name').value.trim();
    const newHandle = document.getElementById('edit-user-handle').value.trim();
    const newBio = document.getElementById('edit-user-bio').value.trim();
    const newTag1 = document.getElementById('edit-custom-tag1').value.trim();
    const newTag2 = document.getElementById('edit-custom-tag2').value.trim();
    const newTag1Icon = document.getElementById('edit-tag1-icon').value.trim() || '✨';
    const newTag2Icon = document.getElementById('edit-tag2-icon').value.trim() || '📅';
    const newTag1Color = document.getElementById('edit-tag1-color').value || '#71767b';
    const newTag2Color = document.getElementById('edit-tag2-color').value || '#71767b';
    const newFollowing = getFollowCountValue(document.getElementById('edit-following-count').value);
    const newFollowers = getFollowCountValue(document.getElementById('edit-followers-count').value);
    const newCover = document.getElementById('edit-cover-image').src;
    const newAvatar = document.getElementById('edit-main-avatar').src;

    // 获取认证类型数据
    const newVerificationType = document.getElementById('edit-verification-type').value;
    const newCoupleCharacterId = document.getElementById('edit-couple-character').value;

    // 获取情侣角色的X平台身份信息（如果有选择）
    let newCoupleCharacterName = '';
    if (newCoupleCharacterId) {
      try {
        const db = getXDB();

        const coupleCharacterProfile = await db.xCharacterProfiles.get(newCoupleCharacterId);
        if (coupleCharacterProfile) {
          // 使用X平台的handle和name组合
          newCoupleCharacterName = `@${coupleCharacterProfile.xHandle}（${coupleCharacterProfile.xName}）`;
        } else {
          // 如果没有X资料，从选项中获取，并生成默认格式
          const coupleOption = document.querySelector(`#edit-couple-character option[value="${newCoupleCharacterId}"]`);
          const displayName = coupleOption ? coupleOption.textContent : '';
          if (displayName) {
            const defaultHandle = displayName.toLowerCase().replace(/\s+/g, '_');
            newCoupleCharacterName = `@${defaultHandle}（${displayName}）`;
          }
        }
      } catch (error) {
        console.error('获取情侣角色X资料失败:', error);
        // 备用方案：从选项中获取
        const coupleOption = document.querySelector(`#edit-couple-character option[value="${newCoupleCharacterId}"]`);
        const displayName = coupleOption ? coupleOption.textContent : '';
        if (displayName) {
          const defaultHandle = displayName.toLowerCase().replace(/\s+/g, '_');
          newCoupleCharacterName = `@${defaultHandle}（${displayName}）`;
        }
      }
    }

    // 获取公众身份和真名设置
    const newPublicIdentity = document.getElementById('edit-public-identity').value.trim();
    const newShowRealName = document.getElementById('edit-show-real-name').checked;
    const newRealName = document.getElementById('edit-real-name').value.trim();

    // 验证数据
    if (!newName) {
      showXToast('名称不能为空', 'error');
      return;
    }

    if (!newHandle) {
      showXToast('用户名不能为空', 'error');
      return;
    }

    if (newName.length > 50) {
      showXToast('名称不能超过50个字符', 'error');
      return;
    }

    if (newHandle.length > 15) {
      showXToast('用户名不能超过15个字符', 'error');
      return;
    }

    if (newBio.length > 160) {
      showXToast('自我介绍不能超过160个字符', 'error');
      return;
    }

    if (newTag1.length > 30) {
      showXToast('自定义标签1不能超过30个字符', 'error');
      return;
    }

    if (newTag2.length > 30) {
      showXToast('自定义标签2不能超过30个字符', 'error');
      return;
    }

    if (newFollowing.length > 20) {
      showXToast('关注数量过长', 'error');
      return;
    }

    if (newFollowers.length > 20) {
      showXToast('关注者数量过长', 'error');
      return;
    }

    // 公众身份已移除字符限制

    if (newShowRealName && newRealName.length > 50) {
      showXToast('真实姓名不能超过50个字符', 'error');
      return;
    }

    if (newShowRealName && !newRealName) {
      showXToast('选择公开真名时必须填写真实姓名', 'error');
      return;
    }

    // 更新用户数据（使用window.userProfileData确保数据持久化）
    window.userProfileData.name = newName;
    window.userProfileData.handle = '@' + newHandle;
    window.userProfileData.bio = newBio;
    window.userProfileData.customTag1 = newTag1;
    window.userProfileData.customTag2 = newTag2;
    window.userProfileData.customTag1Icon = newTag1Icon;
    window.userProfileData.customTag2Icon = newTag2Icon;
    window.userProfileData.customTag1Color = newTag1Color;
    window.userProfileData.customTag2Color = newTag2Color;
    window.userProfileData.following = newFollowing;
    window.userProfileData.followers = newFollowers;
    window.userProfileData.coverImage = newCover;
    window.userProfileData.avatar = newAvatar;

    // 更新认证类型数据
    window.userProfileData.verificationType = newVerificationType;
    window.userProfileData.coupleCharacterId = newCoupleCharacterId;
    window.userProfileData.coupleCharacterName = newCoupleCharacterName;

    // 更新公众身份和真名设置
    window.userProfileData.publicIdentity = newPublicIdentity;
    window.userProfileData.showRealName = newShowRealName;
    window.userProfileData.realName = newShowRealName ? newRealName : ''; // 只有选择公开时才保存真名

    // 根据认证类型更新verified字段
    window.userProfileData.verified = newVerificationType !== 'none';

    // ⚠️ 注意：knownIdentityCharacters已通过toggleIdentityCharacter函数实时更新到window.userProfileData
    // 这里不需要重新收集，直接保存即可
    // 确保字段存在
    if (!window.userProfileData.knownIdentityCharacters) {
      window.userProfileData.knownIdentityCharacters = [];
    }

    // 如果是情侣认证且绑定了角色，为该角色也设置情侣认证
    if (newVerificationType === 'couple' && newCoupleCharacterId) {
      setCoupleVerificationForCharacter(newCoupleCharacterId, window.userProfileData.name);
    }

    try {
      // 调试：保存前检查
      console.log('📝 准备保存用户资料...');
      console.log('👤 已知身份角色数:', window.userProfileData.knownIdentityCharacters?.length || 0);
      console.log('👤 已知身份角色列表:', window.userProfileData.knownIdentityCharacters || []);

      // 保存到数据库
      await saveUserProfileToDB();

      // 更新UI显示
      loadUserProfileToUI();

      // 更新认证徽章显示
      updateVerificationBadge();

      // 同步头像到所有位置
      syncUserAvatar(newAvatar);

      // 关闭弹窗
      closeEditProfileModal();

      let successMessage = '个人资料已更新';
      if (window.userProfileData.knownIdentityCharacters && window.userProfileData.knownIdentityCharacters.length > 0) {
        successMessage += `，已设置 ${window.userProfileData.knownIdentityCharacters.length} 个角色知道您的身份`;
      }
      showXToast(successMessage, 'success');

      // 调试：输出身份识别设置
      if (window.userProfileData.knownIdentityCharacters && window.userProfileData.knownIdentityCharacters.length > 0) {
        console.log('✅ 已保存的用户身份识别设置:', window.userProfileData.knownIdentityCharacters);
        console.log('✅ 这些角色现在知道您的身份，可以在X平台上与您自然互动');
      }
    } catch (error) {
      console.error('保存个人资料失败:', error);
      showXToast('保存失败: ' + error.message, 'error');
    }
  }

  // 发帖弹窗相关功能

  // 隐私设置状态：'public' = 所有人可见，'private' = 仅自己可见
  let tweetPrivacySetting = 'public';

  // 打开发帖弹窗
  function openComposeTweetModal() {
    const modal = document.getElementById('compose-tweet-modal');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    // 重置弹窗内容
    resetComposeModal();

    // 同步用户头像
    const avatar = document.querySelector('#compose-tweet-modal img[alt="用户头像"]');
    if (avatar) {
      avatar.src = userProfileData.avatar;
    }
  }

  // 关闭发帖弹窗
  function closeComposeTweetModal(event) {
    if (event && event.target !== event.currentTarget) {
      return;
    }

    const modal = document.getElementById('compose-tweet-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';

    // 清理引用内容
    if (typeof removeQuoteContent === 'function') {
      removeQuoteContent();
    }
  }

  // 重置弹窗内容
  function resetComposeModal() {
    // 清空文本输入
    document.getElementById('compose-text-input').value = '';
    updateComposeCharCount();
    updateComposeTweetButton();

    // 隐藏所有功能区域
    document.getElementById('compose-image-section').style.display = 'none';
    document.getElementById('compose-location-section').style.display = 'none';
    document.getElementById('compose-link-section').style.display = 'none';

    // 重置功能按钮状态
    resetFunctionButtonStates();

    // 清空各功能区域的内容
    clearImageSection();
    clearLocationSection();
    clearLinkSection();

    // 重置隐私设置为默认值
    tweetPrivacySetting = 'public';
    const iconPath = document.getElementById('privacy-icon-path');
    const textElement = document.getElementById('privacy-text');
    iconPath.setAttribute(
      'd',
      'M12 1.75C6.34 1.75 1.75 6.34 1.75 12S6.34 22.25 12 22.25 22.25 17.66 22.25 12 17.66 1.75 12 1.75zm-.81 14.68l-4.1-3.27 1.25-1.57 2.47 1.98 3.97-5.47 1.62 1.18-5.21 7.15z',
    );
    textElement.textContent = '所有人可以回复';

    // 清理引用内容
    if (typeof removeQuoteContent === 'function') {
      removeQuoteContent();
    }
  }

  // 处理文本输入
  function handleComposeInput() {
    updateComposeCharCount();
    updateComposeTweetButton();
    processHashtagsAndMentions();
  }

  // 更新字符计数
  function updateComposeCharCount() {
    const textInput = document.getElementById('compose-text-input');
    const charCount = document.getElementById('compose-char-count');
    const length = textInput.value.length;

    charCount.textContent = `${length} / 280`;

    // 根据字符数更改颜色
    if (length > 260) {
      charCount.style.color = '#f4212e';
    } else if (length > 240) {
      charCount.style.color = '#ffad1f';
    } else {
      charCount.style.color = '#71767b';
    }
  }

  // 更新发帖按钮状态
  function updateComposeTweetButton() {
    const textInput = document.getElementById('compose-text-input');
    const tweetBtn = document.getElementById('compose-tweet-btn');
    const hasContent = textInput.value.trim().length > 0;

    if (hasContent) {
      tweetBtn.disabled = false;
      tweetBtn.style.opacity = '1';
      tweetBtn.style.cursor = 'pointer';
    } else {
      tweetBtn.disabled = true;
      tweetBtn.style.opacity = '0.5';
      tweetBtn.style.cursor = 'not-allowed';
    }
  }

  // 处理话题标签和提及
  function processHashtagsAndMentions() {
    const textInput = document.getElementById('compose-text-input');
    const text = textInput.value;

    // 这里可以添加实时高亮#和@的逻辑
    // 由于textarea的限制，我们暂时不实现实时高亮
    // 在实际发布时会处理这些标签
  }

  // 切换图片区域
  function toggleImageSection() {
    const section = document.getElementById('compose-image-section');
    const btn = document.getElementById('image-btn');

    if (section.style.display === 'none') {
      section.style.display = 'block';
      btn.style.backgroundColor = 'rgba(29,155,240,0.1)';
    } else {
      section.style.display = 'none';
      btn.style.backgroundColor = 'transparent';
      clearImageSection();
    }
  }

  // 选择图片添加方式
  function selectImageMethod(method) {
    const descBtn = document.getElementById('img-desc-btn');
    const uploadBtn = document.getElementById('img-upload-btn');
    const descInput = document.getElementById('image-description-input');
    const uploadArea = document.getElementById('image-upload-area');

    // 重置按钮样式
    descBtn.style.backgroundColor = '#333';
    descBtn.style.borderColor = '#536471';
    uploadBtn.style.backgroundColor = '#333';
    uploadBtn.style.borderColor = '#536471';

    // 隐藏所有区域
    descInput.style.display = 'none';
    uploadArea.style.display = 'none';

    if (method === 'description') {
      descBtn.style.backgroundColor = '#1d9bf0';
      descBtn.style.borderColor = '#1d9bf0';
      descInput.style.display = 'block';
    } else if (method === 'upload') {
      uploadBtn.style.backgroundColor = '#1d9bf0';
      uploadBtn.style.borderColor = '#1d9bf0';
      uploadArea.style.display = 'block';
    }
  }

  // 触发图片上传
  function triggerImageUpload() {
    document.getElementById('image-file-input').click();
  }

  // 处理图片上传
  function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    // 验证文件类型
    if (!file.type.startsWith('image/')) {
      showXToast('请选择图片文件', 'error');
      return;
    }

    // 验证文件大小
    if (file.size > 5 * 1024 * 1024) {
      showXToast('图片文件不能超过5MB', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      const previewArea = document.getElementById('uploaded-image-preview');
      const previewImg = document.getElementById('preview-image');

      previewImg.src = e.target.result;
      previewArea.style.display = 'block';

      showXToast('图片上传成功', 'success');
    };
    reader.readAsDataURL(file);
  }

  // 移除图片
  function removeImage() {
    clearImageSection();
    toggleImageSection(); // 关闭图片区域
  }

  // 清空图片区域
  function clearImageSection() {
    // 重置文件输入
    document.getElementById('image-file-input').value = '';

    // 隐藏预览
    document.getElementById('uploaded-image-preview').style.display = 'none';

    // 清空描述文本
    const descTextarea = document.querySelector('#image-description-input textarea');
    if (descTextarea) {
      descTextarea.value = '';
    }

    // 重置按钮状态
    const descBtn = document.getElementById('img-desc-btn');
    const uploadBtn = document.getElementById('img-upload-btn');
    descBtn.style.backgroundColor = '#333';
    descBtn.style.borderColor = '#536471';
    uploadBtn.style.backgroundColor = '#333';
    uploadBtn.style.borderColor = '#536471';

    // 隐藏输入区域
    document.getElementById('image-description-input').style.display = 'none';
    document.getElementById('image-upload-area').style.display = 'none';
  }

  // 切换位置区域
  function toggleLocationSection() {
    const section = document.getElementById('compose-location-section');
    const btn = document.getElementById('location-btn');

    if (section.style.display === 'none') {
      section.style.display = 'block';
      btn.style.backgroundColor = 'rgba(29,155,240,0.1)';
    } else {
      section.style.display = 'none';
      btn.style.backgroundColor = 'transparent';
      clearLocationSection();
    }
  }

  // 移除位置
  function removeLocation() {
    clearLocationSection();
    toggleLocationSection(); // 关闭位置区域
  }

  // 清空位置区域
  function clearLocationSection() {
    document.getElementById('location-input').value = '';
  }

  // 切换链接区域
  function toggleLinkSection() {
    const section = document.getElementById('compose-link-section');
    const btn = document.getElementById('attach-btn');

    if (section.style.display === 'none') {
      section.style.display = 'block';
      btn.style.backgroundColor = 'rgba(29,155,240,0.1)';
    } else {
      section.style.display = 'none';
      btn.style.backgroundColor = 'transparent';
      clearLinkSection();
    }
  }

  // 移除链接
  function removeLink() {
    clearLinkSection();
    toggleLinkSection(); // 关闭链接区域
  }

  // 清空链接区域
  function clearLinkSection() {
    document.getElementById('link-title-input').value = '';
    document.getElementById('link-url-input').value = '';
    document.getElementById('link-description-input').value = '';
  }

  // 重置功能按钮状态
  function resetFunctionButtonStates() {
    const buttons = ['image-btn', 'location-btn', 'attach-btn'];
    buttons.forEach(btnId => {
      const btn = document.getElementById(btnId);
      btn.style.backgroundColor = 'transparent';
    });
  }

  // 切换隐私设置
  function togglePrivacySettings() {
    // 切换隐私状态
    tweetPrivacySetting = tweetPrivacySetting === 'public' ? 'private' : 'public';

    const iconPath = document.getElementById('privacy-icon-path');
    const textElement = document.getElementById('privacy-text');

    if (tweetPrivacySetting === 'public') {
      // 所有人可见
      iconPath.setAttribute(
        'd',
        'M12 1.75C6.34 1.75 1.75 6.34 1.75 12S6.34 22.25 12 22.25 22.25 17.66 22.25 12 17.66 1.75 12 1.75zm-.81 14.68l-4.1-3.27 1.25-1.57 2.47 1.98 3.97-5.47 1.62 1.18-5.21 7.15z',
      );
      textElement.textContent = '所有人可以回复';
    } else {
      // 仅自己可见
      iconPath.setAttribute(
        'd',
        'M17.863 13.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44zM12 2C9.791 2 8 3.79 8 6s1.791 4 4 4 4-1.79 4-4-1.791-4-4-4z',
      );
      textElement.textContent = '仅自己可见';
    }

    showXToast(`已切换为${tweetPrivacySetting === 'public' ? '所有人可见' : '仅自己可见'}`, 'success');
  }

  // 发布推文
  async function publishTweet() {
    const textInput = document.getElementById('compose-text-input');
    const content = textInput.value.trim();

    if (!content) {
      showXToast('请输入推文内容', 'error');
      return;
    }

    // 获取附加内容（使用window.userProfileData确保获取最新账号数据）
    const tweetData = {
      id: 'user_' + Date.now(),
      content: content,
      image: getImageData(),
      location: getLocationData(),
      link: getLinkData(),
      timestamp: new Date(),
      user: {
        name: window.userProfileData.name,
        handle: window.userProfileData.handle,
        avatar: window.userProfileData.avatar,
        verified: window.userProfileData.verified,
      },
      stats: {
        comments: 0,
        retweets: 0,
        likes: 0,
        views: 0,
      },
      comments: [],
      privacy: tweetPrivacySetting,
    };

    // 如果有引用内容，添加到推文中
    if (typeof currentQuoteData !== 'undefined' && currentQuoteData) {
      tweetData.quotedTweet = {
        type: currentQuoteData.type,
        user: {
          name: currentQuoteData.user.name,
          handle: currentQuoteData.user.handle,
          avatar: currentQuoteData.user.avatar,
          verified: currentQuoteData.user.verified,
        },
        content: currentQuoteData.content,
        time: currentQuoteData.time,
        image: currentQuoteData.image || null, // 保存图片数据
        link: currentQuoteData.link || null, // 保存链接数据
        location: currentQuoteData.location || null, // 保存位置数据
      };
    }

    console.log('推文数据:', tweetData);

    // 关闭弹窗
    closeComposeTweetModal();

    // 保存用户发布的帖子到个人页面
    await saveUserTweet(tweetData);

    // 如果当前在个人主页，刷新推文显示
    if (document.getElementById('x-profile-page').style.display !== 'none') {
      loadUserProfileTweets();
    }

    // 显示推文详情页面
    showTweetDetail(tweetData);

    showXToast(currentQuoteData ? '引用转发已发布！' : '发帖成功！', 'success');

    // 如果设置为所有人可见，触发AI回复
    if (tweetPrivacySetting === 'public') {
      showXToast('正在等待回复...', 'info');
      await generateAIResponseForTweet(tweetData);
    }
  }

  // 获取图片数据
  function getImageData() {
    const imageSection = document.getElementById('compose-image-section');
    if (imageSection.style.display === 'none') return null;

    const descTextarea = document.querySelector('#image-description-input textarea');
    const previewImg = document.getElementById('preview-image');

    if (descTextarea && descTextarea.style.display !== 'none' && descTextarea.value.trim()) {
      return {
        type: 'description',
        content: descTextarea.value.trim(),
      };
    } else if (previewImg && previewImg.src && previewImg.src.startsWith('data:')) {
      return {
        type: 'upload',
        content: previewImg.src,
      };
    }

    return null;
  }

  // 获取位置数据
  function getLocationData() {
    const locationSection = document.getElementById('compose-location-section');
    if (locationSection.style.display === 'none') return null;

    const locationInput = document.getElementById('location-input');
    const location = locationInput.value.trim();

    return location ? location : null;
  }

  // 获取链接数据
  function getLinkData() {
    const linkSection = document.getElementById('compose-link-section');
    if (linkSection.style.display === 'none') return null;

    const title = document.getElementById('link-title-input').value.trim();
    const url = document.getElementById('link-url-input').value.trim();
    const description = document.getElementById('link-description-input').value.trim();

    if (title || url || description) {
      return {
        title: title,
        url: url,
        description: description,
      };
    }

    return null;
  }

  // 保存功能相关函数
  function saveImageData() {
    showXToast('图片数据已保存', 'success');
  }

  function saveLocationData() {
    const locationInput = document.getElementById('location-input');
    if (locationInput.value.trim()) {
      showXToast('位置信息已保存', 'success');
    } else {
      showXToast('请先输入位置信息', 'error');
    }
  }

  function saveLinkData() {
    const title = document.getElementById('link-title-input').value.trim();
    const url = document.getElementById('link-url-input').value.trim();
    const description = document.getElementById('link-description-input').value.trim();

    if (title || url || description) {
      showXToast('链接信息已保存', 'success');
    } else {
      showXToast('请先填写链接信息', 'error');
    }
  }

  // 处理链接首图上传
  function triggerLinkImageUpload() {
    document.getElementById('link-image-input').click();
  }

  function handleLinkImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    // 验证文件类型
    if (!file.type.startsWith('image/')) {
      showXToast('请选择图片文件', 'error');
      return;
    }

    // 验证文件大小
    if (file.size > 5 * 1024 * 1024) {
      showXToast('图片文件不能超过5MB', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      const previewArea = document.getElementById('link-image-preview');
      const previewImg = document.getElementById('link-preview-image');

      previewImg.src = e.target.result;
      previewArea.style.display = 'block';

      showXToast('链接首图上传成功', 'success');
    };
    reader.readAsDataURL(file);
  }

  // 更新获取链接数据函数
  function getLinkData() {
    const linkSection = document.getElementById('compose-link-section');
    if (linkSection.style.display === 'none') return null;

    const title = document.getElementById('link-title-input').value.trim();
    const url = document.getElementById('link-url-input').value.trim();
    const description = document.getElementById('link-description-input').value.trim();
    const previewImg = document.getElementById('link-preview-image');
    const thumbnail = previewImg && previewImg.src.startsWith('data:') ? previewImg.src : null;

    if (title || url || description || thumbnail) {
      return {
        title: title,
        url: url,
        description: description,
        thumbnail: thumbnail,
      };
    }

    return null;
  }

  // 清空链接区域
  function clearLinkSection() {
    document.getElementById('link-title-input').value = '';
    document.getElementById('link-url-input').value = '';
    document.getElementById('link-description-input').value = '';
    document.getElementById('link-image-input').value = '';
    document.getElementById('link-image-preview').style.display = 'none';
  }

  // 显示推文详情页面
  function showTweetDetail(tweetData) {
    // 保存推文数据到sessionStorage，供重回功能使用
    sessionStorage.setItem('currentTweetData', JSON.stringify(tweetData));

    // 隐藏所有页面
    document.querySelectorAll('.x-page').forEach(page => {
      page.style.display = 'none';
    });

    // 显示推文详情页面
    const detailPage = document.getElementById('x-tweet-detail-page');
    detailPage.style.display = 'flex';

    // 渲染推文详情
    renderTweetDetail(tweetData);

    // 确保用户资料头像正确显示
    setTimeout(() => {
      const detailCommentUserAvatar = document.getElementById('detail-comment-user-avatar');
      if (detailCommentUserAvatar) {
        detailCommentUserAvatar.src = userProfileData.avatar;
      }

      // 更新所有回复输入框头像
      const replyUserAvatars = document.querySelectorAll('.reply-user-avatar');
      replyUserAvatars.forEach(avatar => {
        avatar.src = userProfileData.avatar;
      });
    }, 100);
  }

  // 渲染推文详情
  function renderTweetDetail(tweet) {
    const container = document.getElementById('tweet-detail-container');
    container.setAttribute('data-tweet-id', tweet.id);

    // 创建详情HTML
    const detailHTML = `
              <div class="tweet-detail-item" style="padding: 16px; border-bottom: 1px solid #2f3336;">
                <!-- 用户信息 -->
                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
                  <img src="${tweet.user.avatar}" alt="${tweet.user.name}" 
                    style="width: 48px; height: 48px; border-radius: 50%;">
                  <div>
                    <div style="display: flex; align-items: center; gap: 4px;">
                      <span style="color: #fff; font-weight: 700; font-size: 17px;">${tweet.user.name}</span>
                      ${
                        tweet.user.verified
                          ? '<svg viewBox="0 0 24 24" style="width: 20px; height: 20px; fill: #1d9bf0;"><g><path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.27 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.46 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z"></path></g></svg>'
                          : ''
                      }
                    </div>
                    <div style="color: #71767b; font-size: 15px;">${tweet.user.handle}</div>
                  </div>
                </div>

                <!-- 推文内容 -->
                <div style="color: #fff; font-size: 23px; line-height: 1.3; margin-bottom: 16px; word-wrap: break-word;">
                  ${processContent(tweet.content)}
                </div>

                ${renderTweetMedia(tweet)}
                ${renderTweetLink(tweet)}
                ${renderQuotedTweet(tweet)}

                <!-- 时间和位置信息 -->
                <div style="display: flex; align-items: center; justify-content: space-between; margin: 16px 0; padding: 16px 0; border-top: 1px solid #2f3336; border-bottom: 1px solid #2f3336;">
                  <div style="display: flex; align-items: center; gap: 16px;">
                    <span style="color: #71767b; font-size: 15px;">${formatDetailTime(tweet.timestamp)}</span>
                    <span style="color: #71767b; font-size: 15px;">·</span>
                    <span id="tweet-detail-views" style="color: #71767b; font-size: 15px;">${formatNumber(
                      tweet.stats.views,
                    )} 查看</span>
                  </div>
                  ${
                    tweet.location
                      ? `
                    <div style="display: flex; align-items: center; gap: 4px; color: #1d9bf0; font-size: 15px;">
                      <svg viewBox="0 0 24 24" style="width: 16px; height: 16px; fill: currentColor;">
                        <g>
                          <path d="M12 7c-1.93 0-3.5 1.57-3.5 3.5S10.07 14 12 14s3.5-1.57 3.5-3.5S13.93 7 12 7zm0 5c-.827 0-1.5-.673-1.5-1.5S11.173 9 12 9s1.5.673 1.5 1.5S12.827 12 12 12zm0-10c-4.687 0-8.5 3.813-8.5 8.5 0 5.967 7.621 11.116 7.945 11.332l.555.37.555-.37C12.879 21.616 20.5 16.467 20.5 10.5 20.5 5.813 16.687 2 12 2zm0 17.77c-1.665-1.241-6.5-5.196-6.5-9.27C5.5 6.916 8.416 4 12 4s6.5 2.916 6.5 6.5c0 4.073-4.835 8.028-6.5 9.27z"></path>
                        </g>
                      </svg>
                      <span>${tweet.location}</span>
                    </div>
                  `
                      : ''
                  }
                </div>

                <!-- 互动数据 -->
                <div id="tweet-detail-stats" style="display: flex; align-items: center; gap: 32px; padding: 12px 0; border-bottom: 1px solid #2f3336;">
                  <div style="display: flex; align-items: center; gap: 4px;">
                    <span style="color: #fff; font-weight: 700; font-size: 15px;">${formatNumber(
                      tweet.stats.retweets,
                    )}</span>
                    <span style="color: #71767b; font-size: 15px;">转推</span>
                  </div>
                  <div style="display: flex; align-items: center; gap: 4px;">
                    <span style="color: #fff; font-weight: 700; font-size: 15px;">${formatNumber(
                      tweet.stats.likes,
                    )}</span>
                    <span style="color: #71767b; font-size: 15px;">喜欢</span>
                  </div>
                  <div style="display: flex; align-items: center; gap: 4px;">
                    <span style="color: #fff; font-weight: 700; font-size: 15px;">${formatNumber(
                      tweet.stats.comments,
                    )}</span>
                    <span style="color: #71767b; font-size: 15px;">书签</span>
                  </div>
                </div>

                <!-- 互动按钮 -->
                <div style="display: flex; justify-content: space-between; padding: 8px 0;">
                  <div class="tweet-action comment" style="display: flex; align-items: center; gap: 8px; padding: 8px; border-radius: 50%; cursor: pointer; color: #71767b; transition: all 0.2s;" onmouseover="this.style.backgroundColor='rgba(29,155,240,0.1)'; this.style.color='#1d9bf0';" onmouseout="this.style.backgroundColor='transparent'; this.style.color='#71767b';">
                    <svg class="action-icon" viewBox="0 0 24 24" fill="currentColor" style="width: 20px; height: 20px;">
                      <g><path d="M1.751 10c0-4.42 3.584-8.005 8.005-8.005h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.005zm8.005-6.005c-3.317 0-6.005 2.69-6.005 6.005 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"></path></g>
                    </svg>
                  </div>
                  <div class="tweet-action retweet" style="display: flex; align-items: center; gap: 8px; padding: 8px; border-radius: 50%; cursor: pointer; color: #71767b; transition: all 0.2s;" onmouseover="this.style.backgroundColor='rgba(0,186,124,0.1)'; this.style.color='#00ba7c';" onmouseout="this.style.backgroundColor='transparent'; this.style.color='#71767b';">
                    <svg class="action-icon" viewBox="0 0 24 24" fill="currentColor" style="width: 20px; height: 20px;">
                      <g><path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.791-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.791 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"></path></g>
                    </svg>
                  </div>
                  <div class="tweet-action like" onclick="toggleDetailLike('${
                    tweet.id
                  }', this)" data-liked="false" data-likes="${
      tweet.stats.likes
    }" style="display: flex; align-items: center; gap: 8px; padding: 8px; border-radius: 50%; cursor: pointer; color: #71767b; transition: all 0.2s;" onmouseover="this.style.backgroundColor='rgba(249,24,128,0.1)'; this.style.color='#f91880';" onmouseout="this.style.backgroundColor='transparent'; this.style.color='#71767b';">
                    <svg class="action-icon like-icon" viewBox="0 0 24 24" fill="currentColor" style="width: 20px; height: 20px;">
                      <g><path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path></g>
                    </svg>
                  </div>
                  <div class="tweet-action bookmark" style="display: flex; align-items: center; gap: 8px; padding: 8px; border-radius: 50%; cursor: pointer; color: #71767b; transition: all 0.2s;" onmouseover="this.style.backgroundColor='rgba(29,155,240,0.1)'; this.style.color='#1d9bf0';" onmouseout="this.style.backgroundColor='transparent'; this.style.color='#71767b';">
                    <svg class="action-icon" viewBox="0 0 24 24" fill="currentColor" style="width: 20px; height: 20px;">
                      <g><path d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5zM6.5 4c-.276 0-.5.22-.5.5v14.56l6-4.29 6 4.29V4.5c0-.28-.224-.5-.5-.5h-11z"></path></g>
                    </svg>
                  </div>
                  <div class="tweet-action share" style="display: flex; align-items: center; gap: 8px; padding: 8px; border-radius: 50%; cursor: pointer; color: #71767b; transition: all 0.2s;" onmouseover="this.style.backgroundColor='rgba(29,155,240,0.1)'; this.style.color='#1d9bf0';" onmouseout="this.style.backgroundColor='transparent'; this.style.color='#71767b';">
                    <svg class="action-icon" viewBox="0 0 24 24" fill="currentColor" style="width: 20px; height: 20px;">
                      <g><path d="M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.29 3.3-1.42-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z"></path></g>
                    </svg>
                  </div>
                </div>
              </div>
            `;

    container.innerHTML = detailHTML;

    // 同步用户头像
    const commentInputAvatar = document.querySelector('#x-tweet-detail-page .detail-comment-input-area img');
    if (commentInputAvatar) {
      commentInputAvatar.src = userProfileData.avatar;
    }

    // 渲染评论（如果有）
    renderDetailComments(tweet.comments);
  }

  // 渲染推文媒体内容
  function renderTweetMedia(tweet) {
    if (!tweet.image) return '';

    if (tweet.image.type === 'description') {
      return `
                <div style="margin-bottom: 16px; background-color: #1a1a1a; border: 1px solid #333; border-radius: 12px; padding: 16px;">
                  <div style="color: #fff; font-size: 15px; line-height: 1.4;">${tweet.image.content}</div>
                </div>
              `;
    } else if (tweet.image.type === 'upload') {
      return `
                <div style="margin-bottom: 16px; border-radius: 16px; overflow: hidden;">
                  <img src="${tweet.image.content}" style="width: 100%; max-height: 400px; object-fit: cover; display: block;" alt="推文图片">
                </div>
              `;
    }

    return '';
  }

  // 渲染推文链接
  function renderTweetLink(tweet) {
    if (!tweet.link) return '';

    return `
              <div style="margin-bottom: 16px; border: 1px solid #333; border-radius: 12px; overflow: hidden; transition: background-color 0.2s;" onmouseover="this.style.backgroundColor='rgba(255,255,255,0.03)'" onmouseout="this.style.backgroundColor='transparent'">
                ${
                  tweet.link.thumbnail
                    ? `
                  <div style="width: 100%; height: 200px; background-color: #333;">
                    <img src="${tweet.link.thumbnail}" style="width: 100%; height: 100%; object-fit: cover;" alt="链接预览图">
                  </div>
                `
                    : ''
                }
                <div style="padding: 12px;">
                  <div style="color: #71767b; font-size: 13px; margin-bottom: 4px;">${tweet.link.url || '链接'}</div>
                  ${
                    tweet.link.title
                      ? `<div style="color: #fff; font-size: 15px; font-weight: 600; margin-bottom: 4px; line-height: 1.3;">${tweet.link.title}</div>`
                      : ''
                  }
                  ${
                    tweet.link.description
                      ? `<div style="color: #71767b; font-size: 14px; line-height: 1.4;">${tweet.link.description}</div>`
                      : ''
                  }
                </div>
              </div>
            `;
  }

  // 渲染引用推文内容（详情页版本）
  function renderQuotedTweet(tweet) {
    if (!tweet.quotedTweet) return '';

    const quoted = tweet.quotedTweet;
    const typeText = quoted.type === 'tweet' ? '推文' : '评论';

    return `
              <div style="margin-bottom: 16px; border: 1px solid #333; border-radius: 16px; padding: 16px; background-color: rgba(255,255,255,0.03); transition: background-color 0.2s;" onmouseover="this.style.backgroundColor='rgba(255,255,255,0.05)'" onmouseout="this.style.backgroundColor='rgba(255,255,255,0.03)'">
                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                  <img src="${quoted.user.avatar}" style="width: 24px; height: 24px; border-radius: 50%;" alt="${
      quoted.user.name
    }">
                  <div style="display: flex; align-items: center; gap: 4px;">
                    <span style="color: #fff; font-size: 15px; font-weight: 700;">${quoted.user.name}</span>
                    ${
                      quoted.user.verified
                        ? '<svg viewBox="0 0 24 24" style="width: 18px; height: 18px; fill: #1d9bf0;"><g><path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.27 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.46 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z"></path></g></svg>'
                        : ''
                    }
                    <span style="color: #71767b; font-size: 15px;">${quoted.user.handle}</span>
                    <span style="color: #71767b; font-size: 15px;">·${quoted.time}</span>
                  </div>
                </div>
                <div style="color: #fff; font-size: 17px; line-height: 1.3; word-wrap: break-word;">${
                  quoted.content
                }</div>
                ${renderQuotedTweetMedia(quoted)}
                <div style="color: #71767b; font-size: 13px; margin-top: 12px; font-style: italic;">引用${typeText}</div>
              </div>
            `;
  }

  // 渲染引用内容的媒体（图片）
  function renderQuotedTweetMedia(quoted) {
    if (!quoted.image) return '';

    if (quoted.image.type === 'description') {
      return `
                <div style="margin-top: 8px; background-color: rgba(255,255,255,0.05); border: 1px solid #333; border-radius: 8px; padding: 8px;">
                  <div style="color: #fff; font-size: 13px; line-height: 1.4;">${quoted.image.content}</div>
                </div>
              `;
    } else if (quoted.image.type === 'upload') {
      return `
                <div style="margin-top: 8px; border-radius: 8px; overflow: hidden;">
                  <img src="${quoted.image.content}" style="width: 100%; max-height: 120px; object-fit: cover; display: block;" alt="引用图片">
                </div>
              `;
    }

    return '';
  }

  // 格式化详情页时间
  function formatDetailTime(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();

    const formatter = new Intl.DateTimeFormat('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    return formatter.format(date);
  }

  // 详情页点赞功能
  function toggleDetailLike(tweetId, element) {
    const isLiked = element.dataset.liked === 'true';
    const currentLikes = parseInt(element.dataset.likes);

    if (isLiked) {
      element.dataset.liked = 'false';
      element.dataset.likes = (currentLikes - 1).toString();
      element.style.color = '#71767b';
    } else {
      element.dataset.liked = 'true';
      element.dataset.likes = (currentLikes + 1).toString();
      element.style.color = '#f91880';
    }
  }

  // 详情页评论相关功能
  function handleDetailCommentInput(event) {
    const textarea = event.target;
    const replyBtn = document.getElementById('detail-reply-btn');

    // 更新按钮状态
    if (textarea.value.trim().length > 0) {
      replyBtn.style.opacity = '1';
      replyBtn.disabled = false;
    } else {
      replyBtn.style.opacity = '0.5';
      replyBtn.disabled = true;
    }

    // 回车发送评论
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      if (textarea.value.trim().length > 0) {
        submitDetailComment();
      }
    }
  }

  function autoResizeDetail(textarea) {
    textarea.style.height = '20px';
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';

    const replyBtn = document.getElementById('detail-reply-btn');
    if (textarea.value.trim().length > 0) {
      replyBtn.style.opacity = '1';
      replyBtn.disabled = false;
    } else {
      replyBtn.style.opacity = '0.5';
      replyBtn.disabled = true;
    }
  }

  async function submitDetailComment() {
    const textarea = document.getElementById('detail-comment-input');
    const content = textarea.value.trim();

    if (content.length === 0) return;

    // 获取当前推文数据
    const currentTweetData = sessionStorage.getItem('currentTweetData');
    if (!currentTweetData) {
      showXToast('无法获取推文信息', 'error');
      return;
    }

    let tweetData;
    try {
      tweetData = JSON.parse(currentTweetData);
    } catch (e) {
      showXToast('推文数据解析失败', 'error');
      return;
    }

    // 检查是否为仅自己可见的帖子
    if (tweetData.privacy === 'private') {
      showXToast('私有帖子不支持回复功能', 'error');
      return;
    }

    const newComment = {
      id: 'detail_' + Date.now(),
      user: {
        name: window.userProfileData.name,
        handle: window.userProfileData.handle,
        avatar: window.userProfileData.avatar,
        verified: window.userProfileData.verified,
      },
      content: content,
      time: '刚刚',
      replies: [],
    };

    // 如果有图片，添加图片数据
    if (detailCommentImageData) {
      newComment.image = {
        type: 'upload',
        content: detailCommentImageData,
      };
    }

    // 渲染新评论
    const commentsContainer = document.getElementById('detail-comments-container');
    const commentElement = createCommentElement(newComment);
    commentsContainer.appendChild(commentElement);

    // 更新新添加的回复输入框头像（使用window.userProfileData确保获取最新账号数据）
    const replyUserAvatars = document.querySelectorAll('.reply-user-avatar');
    replyUserAvatars.forEach(avatar => {
      avatar.src = window.userProfileData.avatar;
    });

    // 清空输入框
    textarea.value = '';
    textarea.style.height = '20px';

    // 清除图片
    if (detailCommentImageData) {
      removeDetailCommentImage();
    }

    const replyBtn = document.getElementById('detail-reply-btn');
    replyBtn.style.opacity = '0.5';
    replyBtn.disabled = true;

    showXToast('你的评论等待回复中', 'info');

    // 触发AI回复 - 判断是否为用户自己的帖子
    const isOwnPost =
      tweetData.user && (tweetData.user.handle === userProfileData.handle || tweetData.id.startsWith('user_'));
    await generateUnifiedAIResponse(tweetData, newComment, {
      isOwnPost,
      commentType: 'main_comment',
      pageType: 'detail',
      parentComment: null,
    });
  }

  function renderDetailComments(comments) {
    const container = document.getElementById('detail-comments-container');
    container.innerHTML = '';

    if (!comments || comments.length === 0) return;

    comments.forEach(comment => {
      const commentElement = createCommentElement(comment);
      container.appendChild(commentElement);
    });

    // 更新所有回复输入框头像
    const replyUserAvatars = document.querySelectorAll('.reply-user-avatar');
    replyUserAvatars.forEach(avatar => {
      avatar.src = userProfileData.avatar;
    });
  }

  // ▼▼▼ 【主要！！！】第二个情景：发帖生成器▼▼▼
  async function generateAIResponseForTweet(tweetData, isReroll = false) {
    try {
      // 从数据库读取API配置
      const db = getDB(); // 用于访问API配置
      const xDb = getXDB(); // 用于访问X专用设置

      const apiConfig = await db.apiConfig.get('main');
      if (!apiConfig || !apiConfig.proxyUrl || !apiConfig.apiKey || !apiConfig.model) {
        showXToast('请先配置API设置', 'error');
        return;
      }

      const { proxyUrl, apiKey, model } = apiConfig;

      // 从X设置中读取配置（按账号读取）
      const settingsId = `xSettings_${currentAccountId || 'main'}`;
      const xSettings = await xDb.xSettings.get(settingsId);
      const userPrompt = xSettings?.systemPrompt || '';
      const worldSetting = xSettings?.worldSetting || '';
      const boundCharacters = xSettings?.boundCharacters || [];

      // 使用工具函数构建用户X个人资料信息（使用window.userProfileData确保获取最新数据）
      const userXProfileInfo = StringBuilders.buildUserXProfileInfo(window.userProfileData);

      // 获取知道用户身份的角色信息
      let knownIdentityCharactersInfo = '';
      if (userXProfileInfo.knownIdentityCharacters.length > 0 && boundCharacters.length > 0) {
        const allChats = await db.chats.toArray();
        const knownCharacters = allChats.filter(
          chat => !chat.isGroup && userXProfileInfo.knownIdentityCharacters.includes(chat.id),
        );

        if (knownCharacters.length > 0) {
          knownIdentityCharactersInfo = '\n\n【知道用户身份的角色】：';
          for (const char of knownCharacters) {
            let xProfile = await xDb.xCharacterProfiles.get(char.id);
            if (xProfile) {
              knownIdentityCharactersInfo += `\n- ${xProfile.xName} (${xProfile.xHandle}): 知道用户身份，可能会对用户的帖子进行互动`;
              if (char.history && char.history.length > 0) {
                const recentHistory = char.history.slice(-5);
                knownIdentityCharactersInfo += '\n  最近互动记忆：';
                recentHistory.forEach(msg => {
                  if (msg.role === 'assistant' && msg.content) {
                    knownIdentityCharactersInfo += `\n  - ${msg.content.substring(0, 80)}...`;
                  }
                });
              }
            }
          }
          knownIdentityCharactersInfo += '\n\n注意：这些角色可能会对用户的帖子进行评论，但概率不要太高，要自然。';
        }
      }

      // 1. 提示词 + 世界书
      let systemPrompt = StringBuilders.buildBaseSystemPrompt({
        userPrompt,
        worldSetting,
      });

      // 2. 角色定义（帖子回复生成专用）
      systemPrompt += `

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚫 核心任务说明 🚫
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
你是X社交平台的互动生成器。用户刚发布了一条新帖子，你的任务是：
✅ 生成其他X平台用户对这条帖子的评论和反应
❌ 绝对不能生成用户本人发表的任何内容

**明确：用户已经发布了推文，你只负责生成别人的回应！**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;

      // 3. 角色资料（互动反应场景）
      const charactersInfo = await StringBuilders.buildCompleteCharacterInfo(
        boundCharacters,
        userXProfileInfo,
        'reaction',
      );
      if (charactersInfo) {
        systemPrompt += charactersInfo;
      }
      if (knownIdentityCharactersInfo) {
        systemPrompt += knownIdentityCharactersInfo;
      }

      // 4. 用户资料
      systemPrompt += StringBuilders.buildUniversalConstraints(userXProfileInfo);

      systemPrompt += `

【生成要求】：
- 生成1-15条评论，内容多样化（简短/深度/表情符号），支持楼中楼回复，全年龄适宜
- 引用转发处理：如帖子含引用内容，评论可涉及用户观点和被引用原内容
- 公众身份影响：知名度越高，讨论热度和互动数据越多

【情侣角色回复规则】：
${
  userXProfileInfo.verificationType === 'couple' && userXProfileInfo.coupleCharacterName
    ? `- 用户的情侣是 ${userXProfileInfo.coupleCharacterName}（公开关系）
- 出现概率应很低（10-20%，与帖子无关时更低）
- 评论围绕帖子主题，自然体现亲密关系但不过分强调
- 粉丝群体限制：仅当双方为明星/网红/公众人物时才可能生成1-2条CP粉丝评论，普通情侣严禁生成"磕CP""嗑糖"等粉丝向评论`
    : ''
}

【JSON返回格式】：
\`\`\`json
{
  "stats": {retweets, likes, views, comments},
  "comments": [评论数组]
}
\`\`\`

评论对象结构：
- user: {name, handle, avatar, verified}
- content: 评论文本
- time: 时间描述
- replies: [回复数组] (可选，楼中楼回复，不超过3层)
- replyTo: "@被回复者句柄" (楼中楼回复时必填)

关键规则：
1. verified字段必须是布尔值(true/false)
2. stats中所有数字必须是纯数字
3. 支持多层对话链：A评论 → B回复A(replyTo:"@A") → C回复B(replyTo:"@B")`;

      // 构建消息内容，支持图片识别
      const messageContent = [];

      // 添加基础文本内容
      let contentText = `请为这条推文生成社交互动数据：

推文内容："${tweetData.content}"
${tweetData.location ? `位置：${tweetData.location}` : ''}
${tweetData.link ? `链接：${tweetData.link.title || tweetData.link.url}` : ''}`;

      // 如果有引用内容，添加引用信息
      if (tweetData.quotedTweet) {
        const quoted = tweetData.quotedTweet;
        const quotedType = quoted.type === 'tweet' ? '推文' : '评论';
        contentText += `

【引用${quotedType}】：
原作者：${quoted.user.name} (${quoted.user.handle})${quoted.user.verified ? ' ✓已认证' : ''}
发布时间：${quoted.time}
原内容："${quoted.content}"`;

        // 如果引用内容包含图片，添加图片信息
        if (quoted.image) {
          if (quoted.image.type === 'description') {
            contentText += `
原图片描述：${quoted.image.content}`;
          } else if (quoted.image.type === 'upload') {
            contentText += `
原图片：包含上传的图片内容`;
          }
        }

        // 如果引用内容包含位置信息
        if (quoted.location) {
          contentText += `
原位置：${quoted.location}`;
        }

        contentText += `

注意：这是一条引用转发，用户对原${quotedType}进行了评论并转发。AI回复应该考虑到这个引用关系和上下文，生成的评论可能会同时涉及用户的评论和被引用的原内容。`;
      }

      messageContent.push({ type: 'text', text: contentText });

      // 如果有上传的图片，添加图片内容
      if (tweetData.image && tweetData.image.type === 'upload' && tweetData.image.content) {
        messageContent.push({
          type: 'image_url',
          image_url: { url: tweetData.image.content },
        });
      } else if (tweetData.image && tweetData.image.type === 'description') {
        messageContent.push({
          type: 'text',
          text: `图片描述：${tweetData.image.content}`,
        });
      }

      const messages = [{ role: 'user', content: messageContent }];

      // 判断API类型并发送请求
      let isGemini = proxyUrl.includes('generativelanguage');
      let response;

      if (isGemini) {
        // 为X社交页面创建正确的Gemini请求配置
        const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models';
        const geminiConfig = {
          url: `${GEMINI_API_URL}/${model}:generateContent?key=${getRandomValue(apiKey)}`,
          data: {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text:
                        systemPrompt +
                        '\n\n' +
                        messages
                          .map(m =>
                            Array.isArray(m.content) ? m.content.map(c => c.text || '[图片]').join(' ') : m.content,
                          )
                          .join('\n'),
                    },
                  ],
                },
              ],
              generationConfig: {
                temperature: 0.8,
              },
            }),
          },
        };
        response = await fetch(geminiConfig.url, geminiConfig.data);
      } else {
        const openAiPayload = {
          model: model,
          messages: [{ role: 'system', content: systemPrompt }, ...messages],
          temperature: 0.8,
          stream: false,
        };
        response = await fetch(`${proxyUrl}/v1/chat/completions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify(openAiPayload),
        });
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API错误: ${response.status} - ${errorData.error?.message || response.statusText}`);
      }

      const data = await response.json();
      let aiResponseContent;

      if (isGemini) {
        aiResponseContent = getGeminiResponseText(data);
      } else {
        // OpenAI格式
        aiResponseContent = data.choices?.[0]?.message?.content || '';
      }

      console.log('AI原始响应:', aiResponseContent);

      // 调试用户身份识别信息
      console.log('用户身份识别调试信息（发帖AI回复）:');
      console.log('- 用户X资料:', userXProfileInfo);
      console.log('- 知道用户身份的角色数量:', userXProfileInfo.knownIdentityCharacters.length);
      if (knownIdentityCharactersInfo) {
        console.log('- 知道用户身份的角色信息已添加到AI上下文');
      }

      // 解析AI返回的JSON数据
      const cleanedResponse = aiResponseContent
        .replace(/```json\s*/, '')
        .replace(/```\s*$/, '')
        .trim();

      if (!cleanedResponse) {
        throw new Error('AI返回了空的响应内容');
      }

      let interactionData;
      try {
        interactionData = JSON.parse(cleanedResponse);
      } catch (parseError) {
        console.error('JSON解析失败:', parseError);
        console.error('尝试解析的内容:', cleanedResponse);
        throw new Error(`AI返回的数据不是有效的JSON格式: ${parseError.message}`);
      }

      // 验证数据格式
      if (!interactionData.stats || !interactionData.comments) {
        throw new Error('AI返回的数据格式不正确');
      }

      // 为评论分配ID
      const timestamp = Date.now();
      interactionData.comments.forEach((comment, index) => {
        comment.id = `ai_${timestamp}_${index}`;

        // 为回复分配ID
        if (comment.replies && comment.replies.length > 0) {
          comment.replies.forEach((reply, replyIndex) => {
            reply.id = `ai_${timestamp}_${index}_${replyIndex}`;
          });
        }
      });

      // 更新推文详情页面的数据
      await updateTweetDetailWithAI(tweetData.id, interactionData, isReroll);

      // 如果当前显示的是这条推文的详情页，重新加载完整数据并显示
      const detailPage = document.getElementById('x-tweet-detail-page');
      if (detailPage && detailPage.style.display === 'flex') {
        const currentTweetData = sessionStorage.getItem('currentTweetData');
        if (currentTweetData) {
          const currentTweet = JSON.parse(currentTweetData);
          if (currentTweet.id === tweetData.id) {
            // 从数据库重新加载最新的推文数据（包含AI反应）
            const db = getXDB();
            const accountTweetsId = `userTweets_${currentAccountId || 'main'}`;
            const userTweets = await db.xUserTweets.get(accountTweetsId);
            if (userTweets) {
              const updatedTweet = userTweets.tweets.find(t => t.id === tweetData.id);
              if (updatedTweet) {
                await showTweetDetail(updatedTweet);
                console.log('✅ 详情页已刷新，显示最新AI反应');
              }
            }
          }
        }
      }

      showXToast('你的帖子有人回复了哦', 'success');
    } catch (error) {
      console.error('生成AI回复失败:', error);
      showXToast(`回复生成失败: ${error.message}`, 'error');
    }
  }

  // 重新生成AI回复
  async function rerollAIReplies() {
    try {
      // 获取当前推文ID
      const currentTweetId = getCurrentTweetId();
      if (!currentTweetId) {
        showXToast('无法获取当前推文信息', 'error');
        return;
      }

      // 获取推文数据
      const xTweetsData = await getXTweetsData();
      const currentTweet = xTweetsData.find(tweet => tweet.id === currentTweetId);
      if (!currentTweet) {
        showXToast('未找到推文数据', 'error');
        return;
      }

      // 显示加载状态
      const rerollBtn = document.getElementById('reroll-replies-btn');
      const originalHTML = rerollBtn.innerHTML;
      rerollBtn.innerHTML = `
                 <svg viewBox="0 0 24 24" style="width: 20px; height: 20px; fill: #fff; animation: spin 1s linear infinite;">
                   <g>
                  <path d="M12 4V2A10 10 0 0 0 2 12h2a8 8 0 0 1 8-8z" />
                   </g>
                 </svg>
               `;
      rerollBtn.style.pointerEvents = 'none';

      // 显示重回提示
      showXToast('正在重新生成回复...', 'info');

      // 重新生成AI回复
      await generateAIResponseForTweet(currentTweet, true);

      // 恢复按钮状态
      rerollBtn.innerHTML = originalHTML;
      rerollBtn.style.pointerEvents = 'auto';
    } catch (error) {
      console.error('重新生成AI回复失败:', error);
      showXToast('重新生成失败，请检查网络连接', 'error');

      // 恢复按钮状态
      const rerollBtn = document.getElementById('reroll-replies-btn');
      const originalHTML = `
                             <svg viewBox="0 0 24 24" style="width: 20px; height: 20px; fill: #fff;">
              <g>
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </g>
            </svg>
               `;
      rerollBtn.innerHTML = originalHTML;
      rerollBtn.style.pointerEvents = 'auto';
    }
  }

  // 获取当前显示的推文ID
  function getCurrentTweetId() {
    const tweetDetailContainer = document.getElementById('tweet-detail-container');
    return tweetDetailContainer ? tweetDetailContainer.getAttribute('data-tweet-id') : null;
  }

  // 获取推文数据 - 简化版本，直接返回当前推文数据
  async function getXTweetsData() {
    // 因为推文详情页面只显示单个推文，我们可以从DOM中重构数据
    const currentTweetId = getCurrentTweetId();
    if (!currentTweetId) return [];

    // 从sessionStorage获取推文数据（如果有）
    const tweetData = sessionStorage.getItem('currentTweetData');
    if (tweetData) {
      try {
        return [JSON.parse(tweetData)];
      } catch (e) {
        console.warn('无法解析推文数据:', e);
      }
    }

    return [];
  }
  // ▲▲▲ 【主要！！！】第二个情景：发帖生成器 ▲▲▲

  // 保存用户发布的帖子
  async function saveUserTweet(tweetData) {
    try {
      const db = getXDB();
      const accountTweetsId = `userTweets_${currentAccountId || 'main'}`;

      // 获取当前账户的推文数据
      let userTweets = await db.xUserTweets.get(accountTweetsId);
      if (!userTweets) {
        userTweets = { id: accountTweetsId, tweets: [] };
      }

      // 为推文添加账户ID标识
      tweetData.accountId = currentAccountId || 'main';

      // 添加新推文到开头（最新的在前面）
      userTweets.tweets.unshift(tweetData);

      // 保存更新后的数据
      await db.xUserTweets.put(userTweets);

      console.log('用户推文已保存到账户:', currentAccountId, tweetData);
    } catch (error) {
      console.error('保存用户推文失败:', error);
    }
  }

  // 获取当前账户发布的所有帖子
  async function getUserTweets() {
    try {
      const db = getXDB();
      const accountTweetsId = `userTweets_${currentAccountId || 'main'}`;

      const userTweets = await db.xUserTweets.get(accountTweetsId);
      return userTweets ? userTweets.tweets : [];
    } catch (error) {
      console.error('获取用户推文失败:', error);
      return [];
    }
  }

  // 多选删除相关变量
  let isMultiSelectMode = false;
  let selectedTweets = new Set();

  // 切换推文选择状态
  function toggleTweetSelection(tweetId) {
    if (!isMultiSelectMode) {
      enterMultiSelectMode();
    }

    const tweetEl = document.querySelector(`[data-tweet-id="${tweetId}"]`);
    if (!tweetEl) return;

    if (selectedTweets.has(tweetId)) {
      selectedTweets.delete(tweetId);
      tweetEl.classList.remove('selected');
      tweetEl.style.backgroundColor = '';
    } else {
      selectedTweets.add(tweetId);
      tweetEl.classList.add('selected');
      tweetEl.style.backgroundColor = 'rgba(29, 155, 240, 0.1)';
    }

    updateDeleteUI();
  }

  // 进入多选模式
  function enterMultiSelectMode() {
    isMultiSelectMode = true;

    // 显示删除工具栏
    showDeleteToolbar();

    // 改变所有推文的样式
    document.querySelectorAll('.user-tweet-item').forEach(item => {
      item.style.borderLeft = '3px solid #1d9bf0';
    });
  }

  // 退出多选模式
  function exitMultiSelectMode() {
    isMultiSelectMode = false;
    selectedTweets.clear();

    // 隐藏删除工具栏
    hideDeleteToolbar();

    // 恢复所有推文的样式
    document.querySelectorAll('.user-tweet-item').forEach(item => {
      item.classList.remove('selected');
      item.style.backgroundColor = '';
      item.style.borderLeft = '';
    });
  }

  // 显示删除工具栏
  function showDeleteToolbar() {
    let toolbar = document.getElementById('delete-toolbar');
    if (!toolbar) {
      toolbar = document.createElement('div');
      toolbar.id = 'delete-toolbar';
      toolbar.style.cssText = `
                position: fixed;
                bottom: 80px;
                left: 50%;
                transform: translateX(-50%);
                background-color: #000;
                border: 1px solid #333;
                border-radius: 20px;
                padding: 8px 16px;
                display: flex;
                align-items: center;
                gap: 12px;
                z-index: 1000;
                box-shadow: 0 4px 12px rgba(0,0,0,0.5);
              `;

      toolbar.innerHTML = `
                <button onclick="selectAllTweets()" style="background-color: #1d9bf0; color: #fff; border: none; border-radius: 16px; padding: 6px 12px; font-size: 13px; cursor: pointer;">
                  全选
                </button>
                <span id="selected-count" style="color: #fff; font-size: 14px;">已选择 0 条</span>
                <button onclick="deleteSelectedTweets()" style="background-color: #f91880; color: #fff; border: none; border-radius: 16px; padding: 6px 12px; font-size: 13px; cursor: pointer;">
                  删除
                </button>
                <button onclick="exitMultiSelectMode()" style="background-color: #333; color: #fff; border: none; border-radius: 16px; padding: 6px 12px; font-size: 13px; cursor: pointer;">
                  取消
                </button>
              `;

      document.body.appendChild(toolbar);
    }
    toolbar.style.display = 'flex';
  }

  // 隐藏删除工具栏
  function hideDeleteToolbar() {
    const toolbar = document.getElementById('delete-toolbar');
    if (toolbar) {
      toolbar.style.display = 'none';
    }
  }

  // 更新删除UI
  function updateDeleteUI() {
    const countEl = document.getElementById('selected-count');
    if (countEl) {
      countEl.textContent = `已选择 ${selectedTweets.size} 条`;
    }
  }

  // 全选推文
  function selectAllTweets() {
    document.querySelectorAll('.user-tweet-item').forEach(item => {
      const tweetId = item.dataset.tweetId;
      if (!selectedTweets.has(tweetId)) {
        selectedTweets.add(tweetId);
        item.classList.add('selected');
        item.style.backgroundColor = 'rgba(29, 155, 240, 0.1)';
      }
    });
    updateDeleteUI();
  }

  // 删除选中的推文
  async function deleteSelectedTweets() {
    if (selectedTweets.size === 0) return;

    const confirmDelete = confirm(`确定要删除选中的 ${selectedTweets.size} 条推文吗？删除后无法恢复。`);
    if (!confirmDelete) return;

    try {
      const db = getXDB();

      // 获取当前账户的推文数据
      const accountTweetsId = `userTweets_${currentAccountId || 'main'}`;
      const userTweets = await db.xUserTweets.get(accountTweetsId);
      if (userTweets && userTweets.tweets) {
        // 过滤掉选中的推文
        userTweets.tweets = userTweets.tweets.filter(tweet => !selectedTweets.has(tweet.id));

        // 保存更新后的数据
        await db.xUserTweets.put(userTweets);

        // 同时从主推文数据中删除（如果存在）
        const tweetsData = await db.xTweetsData.get('tweets');
        if (tweetsData) {
          let updated = false;

          if (tweetsData.forYouTweets) {
            const originalLength = tweetsData.forYouTweets.length;
            tweetsData.forYouTweets = tweetsData.forYouTweets.filter(tweet => !selectedTweets.has(tweet.id));
            if (tweetsData.forYouTweets.length !== originalLength) updated = true;
          }

          if (tweetsData.followingTweets) {
            const originalLength = tweetsData.followingTweets.length;
            tweetsData.followingTweets = tweetsData.followingTweets.filter(tweet => !selectedTweets.has(tweet.id));
            if (tweetsData.followingTweets.length !== originalLength) updated = true;
          }

          if (updated) {
            await db.xTweetsData.put(tweetsData);
          }
        }

        showXToast(`已删除 ${selectedTweets.size} 条推文`, 'success');

        // 退出多选模式并刷新显示
        exitMultiSelectMode();
        loadUserProfileTweets();
      }
    } catch (error) {
      console.error('删除推文失败:', error);
      showXToast('删除失败', 'error');
    }
  }

  // 加载用户个人页面的推文
  async function loadUserProfileTweets() {
    try {
      const userTweets = await getUserTweets();
      const container = document.getElementById('x-profile-tweets-container');

      if (userTweets.length === 0) {
        container.innerHTML = `
                  <div style="padding: 60px 32px; text-align: center;">
                    <div style="color: #71767b; font-size: 31px; font-weight: 800; margin-bottom: 8px;">还没有推文</div>
                    <div style="color: #71767b; font-size: 15px;">当你发送第一条推文时，它会显示在这里。</div>
                  </div>
                `;
      } else {
        container.innerHTML = '';
        userTweets.forEach(tweet => {
          const tweetElement = createUserTweetElement(tweet);
          container.appendChild(tweetElement);
        });
      }

      // 更新帖子数量显示
      const headerCount = document.getElementById('x-profile-header-count');
      if (headerCount) {
        headerCount.textContent = `${userTweets.length} 帖子`;
      }
    } catch (error) {
      console.error('加载用户推文失败:', error);
    }
  }

  // 创建用户推文元素（个人页面版本）
  function createUserTweetElement(tweet) {
    const tweetEl = document.createElement('div');
    tweetEl.className = 'tweet-item user-tweet-item';
    tweetEl.dataset.tweetId = tweet.id;
    tweetEl.style.cursor = 'pointer';
    tweetEl.style.position = 'relative';

    // 触摸事件处理变量
    let longPressTimer;
    let isLongPressed = false;
    let touchStartX = 0;
    let touchStartY = 0;
    let hasMoved = false;
    const TOUCH_THRESHOLD = 15; // 滑动阈值（像素）

    tweetEl.addEventListener('touchstart', e => {
      // 记录初始触摸位置
      const touch = e.touches[0];
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
      hasMoved = false;

      longPressTimer = setTimeout(() => {
        if (!hasMoved) {
          // 只有没有移动时才触发长按
          isLongPressed = true;
          toggleTweetSelection(tweet.id);
          e.preventDefault();
        }
      }, 800);
    });

    tweetEl.addEventListener('touchmove', e => {
      const touch = e.touches[0];
      const deltaX = Math.abs(touch.clientX - touchStartX);
      const deltaY = Math.abs(touch.clientY - touchStartY);

      // 如果移动距离超过阈值，标记为滑动
      if (deltaX > TOUCH_THRESHOLD || deltaY > TOUCH_THRESHOLD) {
        hasMoved = true;
        clearTimeout(longPressTimer); // 取消长按
      }
    });

    tweetEl.addEventListener('touchend', e => {
      clearTimeout(longPressTimer);

      // 只有在没有滑动且没有长按的情况下才触发点击
      if (!isLongPressed && !hasMoved) {
        if (isMultiSelectMode) {
          toggleTweetSelection(tweet.id);
        } else {
          showTweetDetail(tweet);
        }
      }

      isLongPressed = false;
      hasMoved = false;
    });

    // 桌面端鼠标事件保持原有逻辑
    tweetEl.addEventListener('mousedown', e => {
      longPressTimer = setTimeout(() => {
        isLongPressed = true;
        toggleTweetSelection(tweet.id);
        e.preventDefault();
      }, 800);
    });

    tweetEl.addEventListener('mouseup', e => {
      clearTimeout(longPressTimer);
      if (!isLongPressed) {
        if (isMultiSelectMode) {
          toggleTweetSelection(tweet.id);
        } else {
          showTweetDetail(tweet);
        }
      }
      isLongPressed = false;
    });

    tweetEl.onclick = null; // 移除原来的点击事件

    // 格式化时间
    function formatTimeForProfile(timestamp) {
      const date = new Date(timestamp);
      const now = new Date();
      const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

      if (diffInHours < 1) {
        const diffInMinutes = Math.floor((now - date) / (1000 * 60));
        return diffInMinutes < 1 ? '刚刚' : `${diffInMinutes}分钟`;
      } else if (diffInHours < 24) {
        return `${diffInHours}小时`;
      } else {
        const diffInDays = Math.floor(diffInHours / 24);
        return diffInDays === 1 ? '1天' : `${diffInDays}天`;
      }
    }

    // 渲染媒体内容
    function renderProfileTweetMedia(tweet) {
      if (!tweet.image) return '';

      if (tweet.image.type === 'description') {
        return `
                  <div style="margin-top: 12px; background-color: #1a1a1a; border: 1px solid #333; border-radius: 12px; padding: 12px;">
                    <div style="color: #fff; font-size: 14px; line-height: 1.4;">${tweet.image.content}</div>
                  </div>
                `;
      } else if (tweet.image.type === 'upload') {
        return `
                  <div style="margin-top: 12px; border-radius: 12px; overflow: hidden;">
                    <img src="${tweet.image.content}" style="width: 100%; max-height: 200px; object-fit: cover; display: block;" alt="推文图片">
                  </div>
                `;
      }
      return '';
    }

    // 渲染链接内容
    function renderProfileTweetLink(tweet) {
      if (!tweet.link) return '';

      return `
                <div style="margin-top: 12px; border: 1px solid #333; border-radius: 12px; overflow: hidden;">
                  ${
                    tweet.link.thumbnail
                      ? `
                    <div style="width: 100%; height: 150px; background-color: #333;">
                      <img src="${tweet.link.thumbnail}" style="width: 100%; height: 100%; object-fit: cover;" alt="链接预览图">
                    </div>
                  `
                      : ''
                  }
                  <div style="padding: 12px;">
                    <div style="color: #71767b; font-size: 13px; margin-bottom: 4px;">${tweet.link.url || '链接'}</div>
                    ${
                      tweet.link.title
                        ? `<div style="color: #fff; font-size: 14px; font-weight: 600; margin-bottom: 4px;">${tweet.link.title}</div>`
                        : ''
                    }
                    ${
                      tweet.link.description
                        ? `<div style="color: #71767b; font-size: 13px;">${tweet.link.description}</div>`
                        : ''
                    }
                  </div>
                </div>
              `;
    }

    // 渲染个人主页引用内容的媒体（图片）
    function renderProfileQuotedTweetMedia(quoted) {
      if (!quoted.image) return '';

      if (quoted.image.type === 'description') {
        return `
                  <div style="margin-top: 6px; background-color: rgba(255,255,255,0.05); border: 1px solid #333; border-radius: 6px; padding: 6px;">
                    <div style="color: #fff; font-size: 12px; line-height: 1.4;">${quoted.image.content}</div>
                  </div>
                `;
      } else if (quoted.image.type === 'upload') {
        return `
                  <div style="margin-top: 6px; border-radius: 6px; overflow: hidden;">
                    <img src="${quoted.image.content}" style="width: 100%; max-height: 80px; object-fit: cover; display: block;" alt="引用图片">
                  </div>
                `;
      }

      return '';
    }

    // 渲染引用推文内容
    function renderProfileQuotedTweet(tweet) {
      if (!tweet.quotedTweet) return '';

      const quoted = tweet.quotedTweet;
      const typeText = quoted.type === 'tweet' ? '推文' : '评论';

      return `
                <div style="margin-top: 12px; border: 1px solid #333; border-radius: 12px; padding: 12px; background-color: rgba(255,255,255,0.03);">
                  <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                    <img src="${quoted.user.avatar}" style="width: 20px; height: 20px; border-radius: 50%;" alt="${
        quoted.user.name
      }">
                    <span style="color: #fff; font-size: 13px; font-weight: 600;">${quoted.user.name}</span>
                    ${
                      quoted.user.verified
                        ? '<svg viewBox="0 0 24 24" style="width: 16px; height: 16px; fill: #1d9bf0;"><g><path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.27 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.46 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z"></path></g></svg>'
                        : ''
                    }
                    <span style="color: #71767b; font-size: 13px;">${quoted.user.handle}</span>
                    <span style="color: #71767b; font-size: 13px;">·${quoted.time}</span>
                  </div>
                  <div style="color: #fff; font-size: 14px; line-height: 1.4;">${quoted.content}</div>
                  ${renderProfileQuotedTweetMedia(quoted)}
                  <div style="color: #71767b; font-size: 12px; margin-top: 8px;">引用${typeText}</div>
                </div>
              `;
    }

    tweetEl.innerHTML = `
              <img class="tweet-avatar" src="${tweet.user.avatar}" alt="${tweet.user.name}">
              <div class="tweet-main">
                <div class="tweet-user-info">
                  <span class="tweet-user-name">${tweet.user.name}</span>
                  ${
                    tweet.user.verified
                      ? '<svg class="tweet-verified" viewBox="0 0 24 24"><g><path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.27 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.46 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z"></path></g></svg>'
                      : ''
                  }
                  <span class="tweet-user-handle">${tweet.user.handle}</span>
                  <span class="tweet-time">·${formatTimeForProfile(tweet.timestamp)}</span>
                  ${
                    tweet.location
                      ? `
                    <div style="display: flex; align-items: center; gap: 4px; margin-left: 8px;">
                      <svg viewBox="0 0 24 24" style="width: 14px; height: 14px; fill: #1d9bf0;">
                        <g><path d="M12 7c-1.93 0-3.5 1.57-3.5 3.5S10.07 14 12 14s3.5-1.57 3.5-3.5S13.93 7 12 7zm0 5c-.827 0-1.5-.673-1.5-1.5S11.173 9 12 9s1.5.673 1.5 1.5S12.827 12 12 12zm0-10c-4.687 0-8.5 3.813-8.5 8.5 0 5.967 7.621 11.116 7.945 11.332l.555.37.555-.37C12.879 21.616 20.5 16.467 20.5 10.5 20.5 5.813 16.687 2 12 2zm0 17.77c-1.665-1.241-6.5-5.196-6.5-9.27C5.5 6.916 8.416 4 12 4s6.5 2.916 6.5 6.5c0 4.073-4.835 8.028-6.5 9.27z"></path></g>
                      </svg>
                      <span style="color: #1d9bf0; font-size: 13px;">${tweet.location}</span>
                    </div>
                  `
                      : ''
                  }
                </div>
                <div class="tweet-content">${processContent(tweet.content)}</div>
                ${renderProfileTweetMedia(tweet)}
                ${renderProfileTweetLink(tweet)}
                ${renderProfileQuotedTweet(tweet)}
                <div class="tweet-actions">
                  <div class="tweet-action comment">
                    <svg class="action-icon" viewBox="0 0 24 24" fill="currentColor">
                      <g><path d="M1.751 10c0-4.42 3.584-8.005 8.005-8.005h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.005zm8.005-6.005c-3.317 0-6.005 2.69-6.005 6.005 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"></path></g>
                    </svg>
                    <span>${DataUtils.formatNumber(tweet.stats.comments)}</span>
                  </div>
                  <div class="tweet-action retweet" onclick="handleQuoteRetweetFromData('tweet', '${tweet.id}')">
                    <svg class="action-icon" viewBox="0 0 24 24" fill="currentColor">
                      <g><path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.791-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.791 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"></path></g>
                    </svg>
                    <span>${DataUtils.formatNumber(tweet.stats.retweets)}</span>
                  </div>
                  <div class="tweet-action like" data-liked="false" data-likes="${tweet.stats.likes}">
                    <svg class="action-icon like-icon" viewBox="0 0 24 24" fill="currentColor">
                      <g><path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path></g>
                    </svg>
                    <span class="like-count">${DataUtils.formatNumber(tweet.stats.likes)}</span>
                  </div>
                  <div class="tweet-action view">
                    <svg class="action-icon" viewBox="0 0 24 24" fill="currentColor">
                      <g><path d="M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10H6v10H4zm9.248 0v-7h2v7h-2z"></path></g>
                    </svg>
                    <span>${DataUtils.formatNumber(tweet.stats.views)}</span>
                  </div>
                  <div class="tweet-action bookmark">
                    <svg class="action-icon" viewBox="0 0 24 24" fill="currentColor">
                      <g><path d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5zM6.5 4c-.276 0-.5.22-.5.5v14.56l6-4.29 6 4.29V4.5c0-.28-.224-.5-.5-.5h-11z"></path></g>
                    </svg>
                  </div>
                  <div class="tweet-action share">
                    <svg class="action-icon" viewBox="0 0 24 24" fill="currentColor">
                      <g><path d="M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.29 3.3-1.42-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z"></path></g>
                    </svg>
                  </div>
                </div>
              </div>
            `;

    return tweetEl;
  }

  // 刷新个人页面的推文显示（用于AI回复后同步数据）
  function refreshUserProfileTweets() {
    const container = document.getElementById('x-profile-tweets-container');
    if (container && container.parentElement.style.display !== 'none') {
      loadUserProfileTweets();
    }
  }

  // 更新推文详情页面的AI数据
  async function updateTweetDetailWithAI(tweetId, interactionData, isReroll = false) {
    // 使用ID精确更新元素

    // 更新互动数据显示区域
    const statsDiv = document.getElementById('tweet-detail-stats');
    if (statsDiv) {
      statsDiv.innerHTML = `
                 <div style="display: flex; align-items: center; gap: 4px;">
                   <span style="color: #fff; font-weight: 700; font-size: 15px;">${formatNumber(
                     interactionData.stats.retweets,
                   )}</span>
                   <span style="color: #71767b; font-size: 15px;">转推</span>
                 </div>
                 <div style="display: flex; align-items: center; gap: 4px;">
                   <span style="color: #fff; font-weight: 700; font-size: 15px;">${formatNumber(
                     interactionData.stats.likes,
                   )}</span>
                   <span style="color: #71767b; font-size: 15px;">喜欢</span>
                 </div>
                 <div style="display: flex; align-items: center; gap: 4px;">
                   <span style="color: #fff; font-weight: 700; font-size: 15px;">${formatNumber(
                     interactionData.stats.comments,
                   )}</span>
                   <span style="color: #71767b; font-size: 15px;">书签</span>
                 </div>
               `;
    }

    // 更新查看数据
    const viewElement = document.getElementById('tweet-detail-views');
    if (viewElement) {
      viewElement.textContent = `${formatNumber(interactionData.stats.views)} 查看`;
    }

    // 添加AI生成的评论
    const commentsContainer = document.getElementById('detail-comments-container');

    // 如果是重回，清除现有评论
    if (isReroll && commentsContainer) {
      commentsContainer.innerHTML = '';
    }
    if (commentsContainer && interactionData.comments.length > 0) {
      interactionData.comments.forEach(comment => {
        // 创建评论组容器
        const commentGroup = document.createElement('div');
        commentGroup.style.cssText = 'position: relative;';

        // 添加主评论
        const commentElement = createCommentElement(comment);

        // 如果有回复，给主评论添加特殊类
        if (comment.replies && comment.replies.length > 0) {
          commentElement.classList.add('has-replies');
        }

        commentGroup.appendChild(commentElement);

        // 渲染回复
        if (comment.replies && comment.replies.length > 0) {
          comment.replies.forEach(reply => {
            const replyElement = createCommentElement(reply, true);
            commentGroup.appendChild(replyElement);
          });
        }

        commentsContainer.appendChild(commentGroup);
      });
    }

    // 更新存储的推文数据
    await updateStoredTweetData(tweetId, interactionData);
  }

  // 更新存储的推文数据（包含AI生成的互动数据和评论）
  async function updateStoredTweetData(tweetId, interactionData) {
    try {
      const db = getXDB();

      // 使用正确的账户ID获取用户推文数据
      const accountTweetsId = `userTweets_${currentAccountId || 'main'}`;
      let userTweets = await db.xUserTweets.get(accountTweetsId);

      if (!userTweets) {
        console.warn('未找到用户推文数据，账户ID:', accountTweetsId);
        return;
      }

      // 查找并更新对应的推文
      const tweetIndex = userTweets.tweets.findIndex(tweet => tweet.id === tweetId);
      if (tweetIndex !== -1) {
        // 更新互动数据
        userTweets.tweets[tweetIndex].stats = {
          ...userTweets.tweets[tweetIndex].stats,
          ...interactionData.stats,
        };

        // 更新评论数据
        userTweets.tweets[tweetIndex].comments = interactionData.comments || [];

        // 保存更新后的数据
        await db.xUserTweets.put(userTweets);

        // 同时更新 sessionStorage 中的当前推文数据
        const currentTweetData = sessionStorage.getItem('currentTweetData');
        if (currentTweetData) {
          try {
            const currentTweet = JSON.parse(currentTweetData);
            if (currentTweet.id === tweetId) {
              currentTweet.stats = userTweets.tweets[tweetIndex].stats;
              currentTweet.comments = userTweets.tweets[tweetIndex].comments;
              sessionStorage.setItem('currentTweetData', JSON.stringify(currentTweet));
            }
          } catch (e) {
            console.warn('更新 sessionStorage 失败:', e);
          }
        }

        console.log('✅ 推文AI反应已保存到数据库:', tweetId, '账户:', accountTweetsId);

        // 刷新个人页面显示
        refreshUserProfileTweets();
      } else {
        console.warn('⚠️ 未找到要更新的推文:', tweetId);
      }
    } catch (error) {
      console.error('❌ 更新存储推文数据失败:', error);
    }
  }

  // ▼▼▼ 【主要！！！】第三个情景：统一AI回复生成器▼▼▼
  async function generateUnifiedAIResponse(tweetData, userComment, options = {}) {
    try {
      const {
        isOwnPost = false,
        commentType = 'main_comment', // 'main_comment' | 'reply_comment'
        pageType = 'detail', // 'detail' | 'main'
        parentComment = null,
        mainCommentId = null, // 用于楼中楼回复的主评论ID
      } = options;

      // 从数据库读取API配置
      const db = getDB(); // 用于访问API配置
      const xDb = getXDB(); // 用于访问X专用设置

      const apiConfig = await db.apiConfig.get('main');
      if (!apiConfig || !apiConfig.proxyUrl || !apiConfig.apiKey || !apiConfig.model) {
        showXToast('请先配置API设置', 'error');
        return;
      }

      const { proxyUrl, apiKey, model } = apiConfig;

      // 从X设置中读取配置（按账号读取）
      const settingsId = `xSettings_${currentAccountId || 'main'}`;
      const xSettings = await xDb.xSettings.get(settingsId);
      const userPrompt = xSettings?.systemPrompt || '';
      const worldSetting = xSettings?.worldSetting || '';
      const boundCharacters = xSettings?.boundCharacters || [];

      // 使用工具函数构建用户X个人资料信息（使用window.userProfileData确保获取最新数据）
      const userXProfileInfo = StringBuilders.buildUserXProfileInfo(window.userProfileData);

      // 1. 提示词 + 世界书
      let systemPrompt = StringBuilders.buildBaseSystemPrompt({
        userPrompt,
        worldSetting,
      });

      // 2. 角色定义（评论回复生成专用）
      systemPrompt += `

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚫 核心任务说明 🚫
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
你是X社交平台的互动生成器。你的任务是：
✅ 为用户的评论生成其他人的回应/反应
❌ 绝对不能再生成用户本人的评论或回复

**明确：用户已经发表了评论，你只负责生成别人对这条评论的反应！**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;

      // 添加场景分支提示词（评论场景特有的详细逻辑）
      systemPrompt += StringBuilders.buildScenarioPrompt({
        isOwnPost,
        commentType,
        pageType,
        parentComment,
      });

      // 3. 角色资料（回复场景）
      const charactersInfo = await StringBuilders.buildCompleteCharacterInfo(
        boundCharacters,
        userXProfileInfo,
        'reply',
      );
      if (charactersInfo) {
        systemPrompt += charactersInfo;
      }

      // 4. 用户资料
      systemPrompt += StringBuilders.buildUniversalConstraints(userXProfileInfo);

      systemPrompt += `

【评论回复要求】：
- 生成1-5条回复，内容多样化（简短/深度/表情符号）
- 环境贴合：参考评论区现有讨论，基于主题和氛围生成贴合回复
- 回复内容必须围绕推文主题和用户评论内容，不要偏离主题

${
  boundCharacters.length > 0
    ? `**角色回复要点**：根据设定判断是否适合发言，符合人设特点，可生成0-2个角色回复，严格使用角色X资料信息。`
    : '**当前状态**：无绑定角色，生成普通用户回复。'
}

【情侣角色回复规则】：
${
  userXProfileInfo.verificationType === 'couple' && userXProfileInfo.coupleCharacterName
    ? `- 用户的情侣是 ${userXProfileInfo.coupleCharacterName}
- **关键限制**：在他人帖子下回复用户评论时，出现概率极低（5-15%）
  * 评论与情侣角色无关 → 不出现
  * 话题普通/日常 → 很少出现
  * 只有评论内容与情侣角色相关、或确有理由参与讨论时才可能出现
- 回复围绕帖子主题和讨论，不只是"秀恩爱"
- 粉丝群体严格限制：仅当双方为明星/网红/公众人物时才可能有1条CP粉丝评论（概率极低），普通情侣绝无"磕学家""CP粉"等粉丝群体`
    : ''
}

【JSON返回格式】：
\`\`\`json
{
  "${commentType === 'reply_comment' && pageType === 'main' ? 'replies' : 'comments'}": [回复数组]
}
\`\`\`

回复对象结构：
- user: {name, handle, avatar, verified}
- content: 回复文本
- time: 时间描述
- replyTo: "${commentType === 'reply_comment' && parentComment ? parentComment.user.handle : userComment.user.handle}"
- replies: []

关键规则：
1. verified字段必须是布尔值(true/false)
2. ${
        boundCharacters.length > 0
          ? '生成角色回复时必须严格使用提供的角色X资料(xName、xHandle、xAvatar、xVerified)，不得使用默认值或自编信息'
          : '普通用户回复，自创用户名和句柄'
      }`;

      // 构建上下文信息
      let contextInfo = `【推文信息${pageType === 'detail' ? '（详情页）' : '（主页）'}】
标题：${isOwnPost ? '【用户的帖子】' : ''}${tweetData.content}
推文作者：${tweetData.user.name} (${tweetData.user.handle})
${tweetData.location ? `位置：${tweetData.location}` : ''}
${tweetData.link ? `链接：${tweetData.link.title || tweetData.link.url}` : ''}
${tweetData.media && tweetData.media.length > 0 ? `媒体：${tweetData.media[0].description}` : ''}`;

      // 如果推文包含引用内容，添加引用信息
      if (tweetData.quotedTweet) {
        const quoted = tweetData.quotedTweet;
        const quotedType = quoted.type === 'tweet' ? '推文' : '评论';
        contextInfo += `

【该推文引用了以下${quotedType}】
原作者：${quoted.user.name} (${quoted.user.handle})${quoted.user.verified ? ' ✓已认证' : ''}
发布时间：${quoted.time}
原内容："${quoted.content}"`;

        // 如果引用内容包含图片，添加图片信息
        if (quoted.image) {
          if (quoted.image.type === 'description') {
            contextInfo += `
原图片描述：${quoted.image.content}`;
          } else if (quoted.image.type === 'upload') {
            contextInfo += `
原图片：包含上传的图片内容`;
          }
        }

        // 如果引用内容包含位置信息
        if (quoted.location) {
          contextInfo += `
原位置：${quoted.location}`;
        }

        contextInfo += `

注意：这是引用转发，用户的评论是对上述${quotedType}的回应/评论。回复时可以同时考虑用户的评论和被引用的原内容，可以讨论引用关系、原作者观点，或用户的转发评论等。`;
      }

      contextInfo += `

【用户发表的${commentType === 'main_comment' ? '评论' : '回复'}】
用户名：${userComment.user.name}
用户句柄：${userComment.user.handle}
${commentType === 'main_comment' ? '评论' : '回复'}内容：${userComment.content}`;

      if (commentType === 'reply_comment' && parentComment) {
        contextInfo += `

【被回复的评论】
用户名：${parentComment.user.name}
用户句柄：${parentComment.user.handle}
评论内容：${parentComment.content}`;
      }

      // 添加已有评论区内容到上下文
      if (tweetData.comments && tweetData.comments.length > 0) {
        contextInfo += `

【当前评论区内容】（共${tweetData.comments.length}条评论，帮助理解讨论主题和氛围）`;

        // 显示最多前10条评论，避免上下文过长
        const displayComments = tweetData.comments.slice(0, 10);
        displayComments.forEach((comment, index) => {
          contextInfo += `
${index + 1}. ${comment.user.name} (${comment.user.handle}): ${comment.content}`;

          // 如果有回复，也显示前3条
          if (comment.replies && comment.replies.length > 0) {
            const displayReplies = comment.replies.slice(0, 3);
            displayReplies.forEach((reply, replyIndex) => {
              contextInfo += `
   └─ ${reply.user.name} (${reply.user.handle}): ${reply.content}`;
            });

            if (comment.replies.length > 3) {
              contextInfo += `
   └─ ...还有${comment.replies.length - 3}条回复`;
            }
          }
        });

        if (tweetData.comments.length > 10) {
          contextInfo += `
...还有${tweetData.comments.length - 10}条评论未显示`;
        }
      }

      // 查找推文作者是否为绑定角色（如果有绑定角色的话）
      if (boundCharacters.length > 0) {
        // 获取绑定角色信息用于查找推文作者
        const mainDB = getDB(); // 用于访问 chats 表
        const xDB = getXDB(); // 用于访问 xCharacterProfiles 表
        const allChats = await mainDB.chats.toArray();
        const boundCharsData = allChats.filter(chat => !chat.isGroup && boundCharacters.includes(chat.id));

        if (boundCharsData.length > 0) {
          // 获取X资料用于匹配推文作者
          const allXProfiles = await xDB.xCharacterProfiles.toArray();
          const tweetAuthorCharacter = allXProfiles.find(
            xProfile => xProfile.xName === tweetData.user.name || xProfile.xHandle === tweetData.user.handle,
          );

          if (
            tweetAuthorCharacter &&
            tweetAuthorCharacter.relationships &&
            tweetAuthorCharacter.relationships.length > 0
          ) {
            contextInfo += `

【推文作者的已知关系】
推文作者：${tweetAuthorCharacter.xName}
关系网络：
${tweetAuthorCharacter.relationships
  .map(
    rel =>
      `- ${rel.npcName} (${rel.npcHandle}): ${rel.relationshipType}${rel.description ? ' | ' + rel.description : ''}`,
  )
  .join('\n')}

注意：如果生成这些NPC的回复，请根据与推文作者的关系特点来调整互动风格。`;
          }
        }
      }

      // 构建消息内容，支持图片识别
      const messageContent = [];
      messageContent.push({ type: 'text', text: contextInfo });

      // 如果用户评论包含上传的图片，添加图片内容
      if (userComment.image && userComment.image.type === 'upload' && userComment.image.content) {
        messageContent.push({
          type: 'image_url',
          image_url: { url: userComment.image.content },
        });
      } else if (userComment.image && userComment.image.type === 'description') {
        messageContent.push({
          type: 'text',
          text: `用户评论附带的图片描述：${userComment.image.content}`,
        });
      }

      const messages = [{ role: 'user', content: messageContent }];

      // API调用
      let isGemini = proxyUrl.includes('generativelanguage');
      let response;

      if (isGemini) {
        // 为X社交页面创建正确的Gemini请求配置
        const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models';
        const geminiConfig = {
          url: `${GEMINI_API_URL}/${model}:generateContent?key=${getRandomValue(apiKey)}`,
          data: {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text:
                        systemPrompt +
                        '\n\n' +
                        messages
                          .map(m =>
                            Array.isArray(m.content) ? m.content.map(c => c.text || '[图片]').join(' ') : m.content,
                          )
                          .join('\n'),
                    },
                  ],
                },
              ],
              generationConfig: {
                temperature: 0.8,
              },
            }),
          },
        };
        response = await fetch(geminiConfig.url, geminiConfig.data);
      } else {
        const openAiPayload = {
          model: model,
          messages: [{ role: 'system', content: systemPrompt }, ...messages],
          temperature: 0.8,
          stream: false,
        };
        response = await fetch(`${proxyUrl}/v1/chat/completions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify(openAiPayload),
        });
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API错误: ${response.status} - ${errorData.error?.message || response.statusText}`);
      }

      const data = await response.json();
      let aiResponseContent = isGemini ? getGeminiResponseText(data) : data.choices?.[0]?.message?.content || '';

      console.log('统一AI原始响应:', aiResponseContent);
      console.log('绑定角色数量:', boundCharacters.length);
      console.log('评论区上下文:', tweetData.comments ? `${tweetData.comments.length}条评论` : '无评论');
      if (tweetData.comments && tweetData.comments.length > 0) {
        console.log(
          '评论示例:',
          tweetData.comments.slice(0, 3).map(c => `${c.user.name}: ${c.content.substring(0, 50)}...`),
        );
      }

      // 解析AI返回的JSON数据
      const cleanedResponse = aiResponseContent
        .replace(/```json\s*/, '')
        .replace(/```\s*$/, '')
        .trim();
      if (!cleanedResponse) throw new Error('AI返回了空的响应内容');

      let replyData;
      try {
        replyData = JSON.parse(cleanedResponse);
      } catch (parseError) {
        console.error('JSON解析失败:', parseError);
        console.error('尝试解析的内容:', cleanedResponse);
        throw new Error(`AI返回的数据不是有效的JSON格式: ${parseError.message}`);
      }

      // 统一数据处理
      const timestamp = Date.now();
      const repliesKey = commentType === 'reply_comment' && pageType === 'main' ? 'replies' : 'comments';
      const replies = replyData[repliesKey] || [];

      if (!Array.isArray(replies)) {
        throw new Error('AI返回的数据格式不正确');
      }

      // 根据页面类型和评论类型处理渲染
      if (pageType === 'detail') {
        // 详情页面：直接渲染到页面 - 修复楼中楼平级回复插入逻辑
        replies.forEach((comment, index) => {
          comment.id = `ai_unified_${timestamp}_${index}`;
          const commentElement = createCommentElement(comment, commentType === 'reply_comment');
          const commentsContainer = document.getElementById('detail-comments-container');

          if (commentType === 'reply_comment' && parentComment) {
            // 对于楼中楼回复，找到被回复评论的位置，插入为平级
            const allComments = commentsContainer.querySelectorAll('.comment-item');
            let insertPosition = null;
            let insertAfter = null;

            // 找到被回复评论的位置
            allComments.forEach(commentEl => {
              if (commentEl.dataset.commentId === parentComment.id) {
                insertPosition = commentEl;

                // 如果被回复的是楼中楼评论，找到这个评论组的最后一个评论
                if (commentEl.classList.contains('reply-item')) {
                  let nextSibling = commentEl.nextElementSibling;
                  insertAfter = commentEl;

                  // 找到当前评论组的最后一条评论
                  while (nextSibling && nextSibling.classList.contains('reply-item')) {
                    insertAfter = nextSibling;
                    nextSibling = nextSibling.nextElementSibling;
                  }
                } else {
                  // 如果被回复的是主评论，找到这个评论组的最后一条评论（包括所有楼中楼）
                  let nextSibling = commentEl.nextElementSibling;
                  insertAfter = commentEl;

                  while (nextSibling && nextSibling.classList.contains('reply-item')) {
                    insertAfter = nextSibling;
                    nextSibling = nextSibling.nextElementSibling;
                  }
                }
              }
            });

            if (insertAfter) {
              // 插入到评论组的最后位置
              if (insertAfter.nextSibling) {
                insertAfter.parentNode.insertBefore(commentElement, insertAfter.nextSibling);
              } else {
                insertAfter.parentNode.appendChild(commentElement);
              }
            } else {
              // 如果没找到位置，就添加到末尾
              commentsContainer.appendChild(commentElement);
            }
          } else {
            // 主评论回复或找不到特定位置时，添加到末尾
            commentsContainer.appendChild(commentElement);
          }
        });

        // 更新回复输入框头像
        const replyUserAvatars = document.querySelectorAll('.reply-user-avatar');
        replyUserAvatars.forEach(avatar => {
          avatar.src = userProfileData.avatar;
        });
      } else {
        // 主页：更新数据并重新渲染
        if (commentType === 'main_comment') {
          // 主评论：添加到推文评论列表
          replies.forEach((comment, index) => {
            comment.id = `ai_main_unified_${timestamp}_${index}`;
            tweetData.comments.push(comment);
          });
          tweetData.stats.comments += replies.length;
        } else {
          // 楼中楼回复：添加到主评论的replies（平级显示）
          const targetCommentId = mainCommentId || parentComment.id;
          const mainCommentObj = tweetData.comments.find(c => c.id === targetCommentId);
          if (mainCommentObj) {
            replies.forEach((reply, index) => {
              reply.id = `ai_main_sub_unified_${timestamp}_${index}`;
              if (!mainCommentObj.replies) mainCommentObj.replies = [];
              mainCommentObj.replies.push(reply);
            });
          } else {
            console.warn('无法找到主评论，mainCommentId:', targetCommentId);
          }
        }

        // 保存数据并重新渲染 - 先从数据库重新加载数据以避免覆盖用户评论
        try {
          const existingData = await xDb.xTweetsData.get('tweets');
          if (existingData) {
            // 更新现有数据而不是完全覆盖
            existingData.forYouTweets = forYouTweets;
            existingData.followingTweets = followingTweets;
            existingData.lastUpdated = new Date().toISOString();
            await xDb.xTweetsData.put(existingData);
          } else {
            await xDb.xTweetsData.put({
              id: 'tweets',
              forYouTweets: forYouTweets,
              followingTweets: followingTweets,
              lastUpdated: new Date().toISOString(),
            });
          }
        } catch (saveError) {
          console.error('保存统一AI回复数据失败:', saveError);
        }

        renderComments(currentTweetId);

        // 滚动到底部
        const commentsContainer = document.querySelector('.comments-container');
        setTimeout(() => {
          commentsContainer.scrollTop = commentsContainer.scrollHeight;
        }, 100);
      }

      showXToast('你的评论已经收到回复!', 'success');
    } catch (error) {
      console.error('生成统一AI回复失败:', error);
      showXToast(`回复生成失败: ${error.message}`, 'error');
    }
  }
  // 注意：已删除重复的API辅助函数定义，使用文件开头的健壮版本

  // ▲▲▲ 【主要！！！】第三个情景：统一AI回复生成器 ▲▲▲

  // ▲▲▲！！！三个情景综合如上！！！▲▲▲

  //▼▼▼ 引用转发功能JavaScript▼▼▼

  // 全局变量存储当前引用内容
  let currentQuoteData = null;

  // 从数据源获取引用信息并处理转发
  async function handleQuoteRetweetFromData(type, id) {
    let sourceData = null;

    if (type === 'tweet') {
      // 从主页推文数据中查找
      const allTweets = [...forYouTweets, ...followingTweets];
      sourceData = allTweets.find(tweet => tweet.id === id);

      // 如果在主页没找到，查找用户推文
      if (!sourceData) {
        try {
          const db = getXDB();

          const userTweets = await db.xUserTweets.get('userTweets');
          if (userTweets && userTweets.tweets) {
            sourceData = userTweets.tweets.find(tweet => tweet.id === id);
          }
        } catch (error) {
          console.error('查找用户推文失败:', error);
        }
      }

      // 如果还没找到，尝试从详情页当前推文中查找
      if (!sourceData) {
        const currentTweetData = sessionStorage.getItem('currentTweetData');
        if (currentTweetData) {
          try {
            const tweetData = JSON.parse(currentTweetData);
            if (tweetData.id === id) {
              sourceData = tweetData;
            }
          } catch (error) {
            console.error('解析详情页推文数据失败:', error);
          }
        }
      }
    } else if (type === 'comment') {
      // 从评论数据中查找
      sourceData = await findCommentById(id);
    }

    if (!sourceData) {
      showXToast('无法找到要引用的内容', 'error');
      return;
    }

    // 处理图片数据（从media字段转换为image格式）
    let imageData = null;
    if (sourceData.media && sourceData.media.length > 0 && sourceData.media[0].type === 'image') {
      imageData = {
        type: 'description',
        content: sourceData.media[0].description,
      };
    } else if (sourceData.image) {
      // 兼容已有的image字段格式
      imageData = sourceData.image;
    }

    // 调用引用处理函数
    handleQuoteRetweet(
      type,
      id,
      sourceData.user.name,
      sourceData.user.handle,
      sourceData.user.avatar,
      sourceData.user.verified,
      sourceData.content || '',
      sourceData.time,
      imageData, // 传递图片数据
      sourceData.link || null, // 传递链接数据
      sourceData.location || null, // 传递位置数据
    );
  }

  // 根据ID查找评论 - 修复楼中楼查找逻辑
  async function findCommentById(commentId) {
    // 首先尝试直接从DOM中找到对应的评论元素并提取数据
    // 这样可以确保引用的是用户实际点击的评论，避免数据结构和DOM结构不匹配
    const commentElement = document.querySelector(`[data-comment-id="${commentId}"]`);
    if (commentElement) {
      try {
        const userName = commentElement.querySelector('.tweet-user-name').textContent;
        const userHandle = commentElement.querySelector('.tweet-user-handle').textContent;
        const userAvatar = commentElement.querySelector('.tweet-avatar').src;
        const verified = commentElement.querySelector('.tweet-verified') !== null;
        const contentElement = commentElement.querySelector('.comment-content');

        // 获取评论内容，过滤掉回复标记
        let content = '';
        if (contentElement) {
          // 克隆节点以避免修改原DOM
          const contentClone = contentElement.cloneNode(true);
          // 移除回复标记
          const replyTo = contentClone.querySelector('.reply-to');
          if (replyTo) {
            replyTo.remove();
          }
          content = contentClone.textContent.trim();
        }

        const timeElement = commentElement.querySelector('.tweet-time');
        const time = timeElement ? timeElement.textContent.replace('·', '').trim() : '刚刚';

        return {
          id: commentId,
          user: {
            name: userName,
            handle: userHandle,
            avatar: userAvatar,
            verified: verified,
          },
          content: content,
          time: time,
        };
      } catch (error) {
        console.error('从DOM提取评论信息失败:', error);
      }
    }

    // 如果从DOM提取失败，回退到数据查找
    // 在主页推文中查找
    const allTweets = [...forYouTweets, ...followingTweets];

    for (const tweet of allTweets) {
      if (tweet.comments) {
        for (const comment of tweet.comments) {
          if (comment.id === commentId) {
            return comment;
          }
          // 检查回复
          if (comment.replies) {
            for (const reply of comment.replies) {
              if (reply.id === commentId) {
                return reply;
              }
            }
          }
        }
      }
    }

    // 在详情页面当前推文中查找
    const currentTweetData = sessionStorage.getItem('currentTweetData');
    if (currentTweetData) {
      const tweetData = ValidationUtils.safeParseJSON(currentTweetData);
      if (tweetData && tweetData.comments) {
        for (const comment of tweetData.comments) {
          if (comment.id === commentId) {
            return comment;
          }
          // 检查回复
          if (comment.replies) {
            for (const reply of comment.replies) {
              if (reply.id === commentId) {
                return reply;
              }
            }
          }
        }
      }
    }

    // 在用户推文中查找
    try {
      const db = getXDB();

      const userTweets = await db.xUserTweets.get('userTweets');
      if (userTweets && userTweets.tweets) {
        for (const tweet of userTweets.tweets) {
          if (tweet.comments) {
            for (const comment of tweet.comments) {
              if (comment.id === commentId) {
                return comment;
              }
              // 检查回复
              if (comment.replies) {
                for (const reply of comment.replies) {
                  if (reply.id === commentId) {
                    return reply;
                  }
                }
              }
            }
          }
        }
      }
    } catch (error) {
      ValidationUtils.handleError(error, '查找用户推文评论');
    }

    return null;
  }

  // 处理引用转发
  function handleQuoteRetweet(
    type,
    id,
    userName,
    userHandle,
    userAvatar,
    verified,
    content,
    time,
    imageData = null,
    linkData = null,
    location = null,
  ) {
    // 打开发帖弹窗
    openComposeTweetModal();

    // 存储引用数据
    currentQuoteData = {
      type: type, // 'tweet' 或 'comment'
      id: id,
      user: {
        name: userName,
        handle: userHandle,
        avatar: userAvatar,
        verified: verified,
      },
      content: content,
      time: time,
      image: imageData, // 图片数据
      link: linkData, // 链接数据
      location: location, // 位置数据
    };

    // 显示引用内容预览
    showQuotePreview();

    // 更新文本输入框占位符
    const textInput = document.getElementById('compose-text-input');
    if (textInput) {
      textInput.placeholder = type === 'tweet' ? '添加你的评论来引用这条推文' : '添加你的评论来引用这条评论';
      textInput.focus();
    }
  }

  // 显示引用内容预览
  function showQuotePreview() {
    if (!currentQuoteData) return;

    const preview = document.getElementById('quote-content-preview');
    const typeText = document.getElementById('quote-type-text');
    const userAvatar = document.getElementById('quote-user-avatar');
    const userName = document.getElementById('quote-user-name');
    const userVerified = document.getElementById('quote-user-verified');
    const userHandle = document.getElementById('quote-user-handle');
    const userTime = document.getElementById('quote-user-time');
    const contentText = document.getElementById('quote-content-text');

    if (!preview) return;

    // 显示预览区域
    preview.style.display = 'block';

    // 设置引用类型
    if (typeText) {
      typeText.textContent = currentQuoteData.type === 'tweet' ? '引用推文' : '引用评论';
    }

    // 设置用户信息
    if (userAvatar) userAvatar.src = currentQuoteData.user.avatar;
    if (userName) userName.textContent = currentQuoteData.user.name;
    if (userHandle) userHandle.textContent = currentQuoteData.user.handle;
    if (userTime) userTime.textContent = '·' + currentQuoteData.time;

    // 显示/隐藏认证图标
    if (userVerified) {
      userVerified.style.display = currentQuoteData.user.verified ? 'inline' : 'none';
    }

    // 设置内容
    if (contentText) {
      // 处理内容中的HTML转义
      const processedContent = currentQuoteData.content
        .replace(/&quot;/g, '"')
        .replace(/&#x27;/g, "'")
        .replace(/&amp;/g, '&');
      contentText.textContent = processedContent;
    }

    // 处理图片内容
    const imageContainer = document.getElementById('quote-image-container');
    if (imageContainer) {
      if (currentQuoteData.image) {
        imageContainer.style.display = 'block';

        if (currentQuoteData.image.type === 'description') {
          imageContainer.innerHTML = `
              <div style="margin-top: 8px; background-color: rgba(255,255,255,0.05); border: 1px solid #333; border-radius: 8px; padding: 8px;">
                <div style="color: #fff; font-size: 13px; line-height: 1.4;">${currentQuoteData.image.content}</div>
              </div>
            `;
        } else if (currentQuoteData.image.type === 'upload') {
          imageContainer.innerHTML = `
              <div style="margin-top: 8px; border-radius: 8px; overflow: hidden;">
                <img src="${currentQuoteData.image.content}" style="width: 100%; max-height: 120px; object-fit: cover; display: block;" alt="引用图片">
              </div>
            `;
        }
      } else {
        imageContainer.style.display = 'none';
        imageContainer.innerHTML = '';
      }
    }
  }

  // 移除引用内容
  function removeQuoteContent() {
    currentQuoteData = null;
    const preview = document.getElementById('quote-content-preview');
    if (preview) {
      preview.style.display = 'none';
    }

    // 清理图片容器
    const imageContainer = document.getElementById('quote-image-container');
    if (imageContainer) {
      imageContainer.style.display = 'none';
      imageContainer.innerHTML = '';
    }

    // 恢复原始占位符
    const textInput = document.getElementById('compose-text-input');
    if (textInput) {
      textInput.placeholder = '有什么新鲜事？';
    }
  }
  //  ▲▲▲ 引用转发功能JavaScript ▲▲▲
  // ▲▲▲ 【整合】X社交app的JavaScript代码结束 ▲▲▲

  // ============================================
  // 第四部分: 初始化和对外接口
  // ============================================

  // 初始化X社交应用
  async function initXSocialApp() {
    try {
      console.log('🚀 初始化 X Social App...');

      // 1. 注入样式
      injectStyles();

      // 2. 创建HTML结构
      createXSocialHTML();

      // 3. 加载活跃账号（必须在加载用户资料之前）
      await loadActiveAccount();
      console.log('📌 当前活跃账户:', currentAccountId);

      // 4. 初始化推文数据
      await initializeTweets();

      // 5. 加载用户资料（使用正确的currentAccountId）
      await loadUserProfile();

      // 6. 初始化X设置（按账号加载）
      await initializeXSettings();

      // 7. 绑定所有事件处理器
      bindEventHandlers();

      // 8. 更新UI显示（确保用户资料正确显示）
      loadUserProfileToUI();

      console.log('✅ X Social App 初始化完成');
    } catch (error) {
      console.error('❌ X Social App 初始化失败:', error);
      showXToast('应用初始化失败: ' + error.message, 'error');
    }
  }

  // 渲染X社交页面 - 兼容现有HTML的调用方式
  function renderXSocialScreen() {
    console.log('🎬 渲染X社交页面');

    // 如果还未初始化，先初始化
    const xScreen = document.getElementById('x-social-screen');
    if (!xScreen) {
      console.log('⚠️ X社交页面未创建，开始初始化...');
      initXSocialApp().then(() => {
        console.log('✅ 初始化完成，显示主页');
        const screen = document.getElementById('x-social-screen');
        if (screen) {
          screen.style.display = 'flex';
          switchXPage('home');
        }
      });
    } else {
      console.log('✅ X社交页面已存在，直接显示');
      // 确保页面可见
      xScreen.style.display = 'flex';
      switchXPage('home');
    }
  }

  // 获取默认用户资料配置（统一管理）
  function getDefaultUserProfile(accountId = 'main') {
    return {
      id: accountId,
      name: accountId === 'main' ? '我' : '新用户',
      handle: accountId === 'main' ? '@me' : '@newuser_' + Date.now().toString().slice(-6),
      avatar: 'https://i.postimg.cc/pXxk1JXk/IMG-6442.jpg',
      coverImage: 'https://i.postimg.cc/qRzMB6nQ/default-cover.jpg',
      verified: false,
      verificationType: 'none',
      bio: '欢迎来到我的X主页！',
      publicIdentity: '',
      showRealName: false,
      realName: '',
      customTag1: '科技爱好者',
      customTag1Icon: '✨',
      customTag1Color: '#71767b',
      customTag2: '2024年加入',
      customTag2Icon: '📅',
      customTag2Color: '#71767b',
      followingCount: accountId === 'main' ? '156' : '0',
      followersCount: accountId === 'main' ? '89' : '0',
      knownIdentityCharacters: [],
      coupleCharacterId: '',
      coupleCharacterName: '',
      lastUpdated: new Date().toISOString(),
    };
  }

  // 加载用户资料（初始化专用 - 简化版）
  async function loadUserProfile() {
    try {
      const db = getXDB();
      const accountId = currentAccountId || 'main';
      const profile = await db.xUserProfile.get(accountId);

      if (profile) {
        // 更新现有对象的属性，而不是替换整个对象（保持引用一致）
        Object.assign(window.userProfileData, profile);
      } else {
        // 使用默认用户资料并保存到数据库（仅在首次初始化时）
        const defaultProfile = getDefaultUserProfile(accountId);
        Object.assign(window.userProfileData, defaultProfile);
        await db.xUserProfile.put(window.userProfileData);
        console.log('📝 已创建默认用户资料:', accountId);
      }

      // 确保必要字段存在（兼容旧数据）
      ensureProfileFields(window.userProfileData);

      console.log('✅ 用户资料已加载:', window.userProfileData.name, '(账户:', accountId + ')');
      console.log('🔍 用户资料详情:', {
        认证类型: window.userProfileData.verificationType,
        情侣角色: window.userProfileData.coupleCharacterName,
        已知身份角色数: window.userProfileData.knownIdentityCharacters?.length || 0,
      });
    } catch (error) {
      console.error('❌ 加载用户资料失败:', error);
      // 即使失败也使用默认值
      const defaultProfile = getDefaultUserProfile('main');
      Object.assign(window.userProfileData, defaultProfile);
    }
  }

  // 确保用户资料包含所有必要字段（用于数据兼容）
  function ensureProfileFields(profile) {
    if (!profile.knownIdentityCharacters) profile.knownIdentityCharacters = [];
    if (!profile.verificationType) profile.verificationType = 'none';
    if (!profile.coupleCharacterId) profile.coupleCharacterId = '';
    if (!profile.coupleCharacterName) profile.coupleCharacterName = '';
    if (profile.publicIdentity === undefined) profile.publicIdentity = '';
    if (profile.showRealName === undefined) profile.showRealName = false;
    if (profile.realName === undefined) profile.realName = '';
    if (!profile.customTag1Color) profile.customTag1Color = '#71767b';
    if (!profile.customTag2Color) profile.customTag2Color = '#71767b';
  }

  // 绑定事件处理器
  function bindEventHandlers() {
    // 因为HTML是动态创建的，需要在创建后绑定所有事件

    // 绑定角色X资料表单事件
    const characterXProfileForm = document.getElementById('character-x-profile-form');
    if (characterXProfileForm) {
      characterXProfileForm.addEventListener('submit', saveCharacterXProfile);
      console.log('✅ 已绑定角色X资料表单提交事件');
    }

    // 绑定简介字符计数事件
    const characterXBio = document.getElementById('character-x-bio');
    if (characterXBio) {
      characterXBio.addEventListener('input', updateCharacterBioCount);
    }

    // 绑定关系表单事件
    const relationshipForm = document.getElementById('relationship-form');
    if (relationshipForm) {
      relationshipForm.addEventListener('submit', saveRelationshipForm);
      console.log('✅ 已绑定关系表单提交事件');
    }

    // 绑定关系描述字符计数事件
    const relationshipDesc = document.getElementById('relationship-description');
    if (relationshipDesc) {
      relationshipDesc.addEventListener('input', updateRelationshipDescCount);
    }

    // 绑定角色真实姓名字符计数事件
    const characterRealName = document.getElementById('character-real-name');
    if (characterRealName) {
      characterRealName.addEventListener('input', updateCharacterXProfileCounts);
    }

    console.log('✅ 所有事件处理器已绑定');
  }

  // ============================================
  // 提问箱功能
  // ============================================

  // 提问箱数据（临时存储，后续可持久化到数据库）
  let askboxData = {
    avatar: 'https://i.postimg.cc/4xmx7V4R/mmexport1759081128356.jpg',
    nickname: '= =',
    prompt: '请向我匿名提问!waiting...',
    background: 'https://i.postimg.cc/7LqVqxt4/mmexport1759588659314.jpg',
    answeredQuestions: [],
  };

  // 提问箱多选删除相关变量
  let isAskboxMultiSelectMode = false;
  let selectedQuestions = new Set();
  let questionLongPressTimer = null;

  // 从数据库加载提问箱数据
  async function loadAskboxDataFromDB() {
    try {
      const xDb = getXDB();
      const accountId = currentAccountId || 'main';
      const askboxId = `askbox_${accountId}`;

      const savedData = await xDb.xAskbox.get(askboxId);

      if (savedData) {
        // 从数据库加载
        Object.assign(askboxData, savedData);
        console.log('✅ 提问箱数据已从数据库加载:', accountId);
      } else {
        // 使用默认数据并保存到数据库
        askboxData.id = askboxId;
        await xDb.xAskbox.put(askboxData);
        console.log('✅ 已创建默认提问箱数据:', accountId);
      }
    } catch (error) {
      console.error('❌ 加载提问箱数据失败:', error);
    }
  }

  // 保存提问箱数据到数据库
  async function saveAskboxDataToDB() {
    try {
      const xDb = getXDB();
      const accountId = currentAccountId || 'main';
      const askboxId = `askbox_${accountId}`;

      askboxData.id = askboxId;
      await xDb.xAskbox.put(askboxData);
      console.log('✅ 提问箱数据已保存到数据库:', accountId);
    } catch (error) {
      console.error('❌ 保存提问箱数据失败:', error);
    }
  }

  // 加载提问箱数据到UI
  async function loadAskboxData() {
    // 从数据库加载
    await loadAskboxDataFromDB();

    // 更新UI
    const avatarEl = document.getElementById('askbox-avatar');
    const nicknameEl = document.getElementById('askbox-nickname');
    const promptEl = document.getElementById('askbox-prompt');
    const backgroundEl = document.getElementById('askbox-background');

    if (avatarEl) avatarEl.src = askboxData.avatar;
    if (nicknameEl) nicknameEl.textContent = askboxData.nickname;
    if (promptEl) promptEl.textContent = askboxData.prompt;
    if (backgroundEl) backgroundEl.style.backgroundImage = `url('${askboxData.background}')`;

    // 渲染已回答的提问列表
    renderAnsweredQuestions();
  }

  // 修改提问箱头像
  async function changeAskboxAvatar() {
    const newAvatar = prompt('请输入新的头像URL:', askboxData.avatar);
    if (newAvatar && newAvatar.trim()) {
      askboxData.avatar = newAvatar.trim();
      const avatarEl = document.getElementById('askbox-avatar');
      if (avatarEl) avatarEl.src = askboxData.avatar;

      // 保存到数据库
      await saveAskboxDataToDB();
      showXToast('头像已更新并保存', 'success');
    }
  }

  // 保存提问箱昵称（原处编辑）
  async function saveAskboxNickname() {
    const nicknameEl = document.getElementById('askbox-nickname');
    if (!nicknameEl) return;

    const newNickname = nicknameEl.textContent.trim();
    if (newNickname && newNickname !== askboxData.nickname) {
      askboxData.nickname = newNickname;
      await saveAskboxDataToDB();
      console.log('✅ 昵称已自动保存:', newNickname);
    }
  }

  // 保存提问卡片文字（原处编辑）
  async function saveAskboxPrompt() {
    const promptEl = document.getElementById('askbox-prompt');
    if (!promptEl) return;

    const newPrompt = promptEl.textContent.trim();
    if (newPrompt && newPrompt !== askboxData.prompt) {
      askboxData.prompt = newPrompt;
      await saveAskboxDataToDB();
      console.log('✅ 提示文字已自动保存:', newPrompt);
    }
  }

  // 打开提问箱设置
  function openAskboxSettings() {
    const newBackground = prompt('请输入新的背景图URL:', askboxData.background);
    if (newBackground && newBackground.trim()) {
      askboxData.background = newBackground.trim();
      const backgroundEl = document.getElementById('askbox-background');
      if (backgroundEl) backgroundEl.style.backgroundImage = `url('${askboxData.background}')`;

      // 保存到数据库
      saveAskboxDataToDB();
      showXToast('背景图已更新并保存', 'success');
    }
  }

  // 获取新的提问（第四个情景：提问箱AI生成）
  async function getNewQuestion() {
    try {
      showXToast('正在生成新的提问...', 'info');

      // 从数据库读取API配置和X设置
      const db = getDB();
      const xDb = getXDB();

      const apiConfig = await db.apiConfig.get('main');
      if (!apiConfig || !apiConfig.proxyUrl || !apiConfig.apiKey || !apiConfig.model) {
        showXToast('请先配置API设置', 'error');
        return;
      }

      const { proxyUrl, apiKey, model } = apiConfig;

      // 从X设置中读取配置（按账号读取）
      const settingsId = `xSettings_${currentAccountId || 'main'}`;
      const xSettings = await xDb.xSettings.get(settingsId);
      const userPrompt = xSettings?.systemPrompt || '';
      const worldSetting = xSettings?.worldSetting || '';
      const boundCharacters = xSettings?.boundCharacters || [];

      // 使用工具函数构建用户X个人资料信息
      const userXProfileInfo = StringBuilders.buildUserXProfileInfo(window.userProfileData);

      // 读取用户已发布的推文
      const userTweetsId = `userTweets_${currentAccountId || 'main'}`;
      const userTweetsData = await xDb.xUserTweets.get(userTweetsId);
      const userTweets = userTweetsData?.tweets || [];
      const recentUserTweets = userTweets.slice(0, 10); // 最近10条推文

      // 获取情侣角色的X资料
      let coupleCharacterInfo = '';
      if (userXProfileInfo.verificationType === 'couple' && userXProfileInfo.coupleCharacterId) {
        const coupleCharacterProfile = await xDb.xCharacterProfiles
          .where('characterId')
          .equals(userXProfileInfo.coupleCharacterId)
          .first();

        if (coupleCharacterProfile) {
          coupleCharacterInfo = `
【情侣角色信息】：
- X姓名：${coupleCharacterProfile.xName}
- X句柄：${coupleCharacterProfile.xHandle}
- X简介：${coupleCharacterProfile.xBio || '无'}
- 公众身份：${coupleCharacterProfile.publicIdentity || '无'}
- 真实姓名：${
            coupleCharacterProfile.showRealName && coupleCharacterProfile.realName
              ? coupleCharacterProfile.realName
              : '未公开'
          }
`;
        }
      }

      // 获取绑定角色信息（用于匿名提问）
      let boundCharactersInfo = '';
      if (boundCharacters.length > 0) {
        const mainDB = getDB();
        const allChats = await mainDB.chats.toArray();
        const boundCharsData = allChats.filter(chat => !chat.isGroup && boundCharacters.includes(chat.id));

        const allXProfiles = await xDb.xCharacterProfiles.toArray();
        const xProfileMap = new Map();
        allXProfiles.forEach(profile => {
          xProfileMap.set(profile.characterId, profile);
        });

        if (boundCharsData.length > 0) {
          boundCharactersInfo = '\n【绑定角色信息（可匿名提问）】：\n以下角色可以作为匿名提问者：\n';
          for (const char of boundCharsData) {
            const xProfile = xProfileMap.get(char.id);
            if (xProfile) {
              boundCharactersInfo += `\n- ${xProfile.xName}（${xProfile.xHandle}）: ${
                char.settings.aiPersona?.substring(0, 100) || ''
              }`;
            }
          }
        }
      }

      // 收集已回复的提问（作为对话历史）
      const answeredQuestionsContext = askboxData.answeredQuestions
        .filter(q => q.answer && q.answer.trim())
        .slice(0, 5) // 最近5个已回复的提问
        .map(q => `Q: ${q.question}\nA: ${q.answer}`)
        .join('\n\n');

      // 构建提问箱专用系统提示词
      let systemPrompt = StringBuilders.buildBaseSystemPrompt({
        userPrompt,
        worldSetting,
      });

      systemPrompt += `

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 核心任务说明 - 匿名提问箱 🎯
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
你是一个匿名提问箱系统。请为用户生成一个有趣的、适合他们身份的匿名提问。

【用户身份信息】：
- 用户名：${userXProfileInfo.name}
- X句柄：${userXProfileInfo.handle}
- 简介：${userXProfileInfo.bio || '无'}
- 公众身份：${userXProfileInfo.publicIdentity || '无'}
- 认证类型：${StringBuilders.getUserVerificationTypeDescription(userXProfileInfo)}
${
  userXProfileInfo.verificationType === 'couple' && userXProfileInfo.coupleCharacterName
    ? `- 情侣关系：与${userXProfileInfo.coupleCharacterName}是公开情侣`
    : ''
}
${coupleCharacterInfo}

【用户最近发布的推文】：
${
  recentUserTweets.length > 0
    ? recentUserTweets.map((tweet, i) => `${i + 1}. ${tweet.content}${tweet.time ? ` (${tweet.time})` : ''}`).join('\n')
    : '暂无推文'
}

${boundCharactersInfo}

${
  answeredQuestionsContext
    ? `【之前的提问与回复历史】：\n${answeredQuestionsContext}\n\n【继续性要求】：新提问可以延续之前的话题，也可以开启新话题，保持自然。`
    : ''
}

【提问生成要求】：
1. 提问要自然、真实，像是真实的匿名用户提出的
2. 提问内容要与用户的身份、简介、公众身份、最近发布的推文相关
3. 如果有绑定角色，可以让角色以匿名身份提问，提问内容要符合角色的人设和性格
4. 如果有之前的提问历史，可以延续话题，也可以提出新话题
5. 提问可以是：
   - 关于最近推文内容的追问或评论
   - 关于生活经验、情感态度的询问
   - 关于兴趣爱好、专业技能的请教
   - 关于日常趣事、特殊经历的好奇
   - 轻松幽默或深度思考的话题
6. 提问长度适中（10-50字），不要太长或太短
7. 语气可以是：好奇的、调侃的、真诚的、幽默的
8. 避免过于私密、冒犯或不适当的问题

【返回格式】：
每行一个提问，用换行符分隔，不需要序号、引号或其他格式
每个提问独立成行，直接输出提问内容

示例格式：
看到你最近发的推文，感觉心情不错呀？
最近有遇到什么让你特别开心的事吗？
如果可以拥有一个超能力，你会选什么？
你觉得最重要的人生品质是什么？

现在，请为用户生成3-10个匿名提问（每行一个）：`;

      const messages = [{ role: 'user', content: '请生成3-10个匿名提问，每行一个' }];

      // 判断API类型并发送请求
      let isGemini = proxyUrl.includes('generativelanguage');
      let response;

      if (isGemini) {
        const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models';
        const geminiConfig = {
          url: `${GEMINI_API_URL}/${model}:generateContent?key=${getRandomValue(apiKey)}`,
          data: {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: systemPrompt + '\n\n' + messages.map(m => m.content).join('\n'),
                    },
                  ],
                },
              ],
              generationConfig: {
                temperature: 0.9,
              },
            }),
          },
        };
        response = await fetch(geminiConfig.url, geminiConfig.data);
      } else {
        const openAiPayload = {
          model: model,
          messages: [{ role: 'system', content: systemPrompt }, ...messages],
          temperature: 0.9,
          stream: false,
        };
        response = await fetch(`${proxyUrl}/v1/chat/completions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify(openAiPayload),
        });
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API错误: ${response.status} - ${errorData.error?.message || response.statusText}`);
      }

      const data = await response.json();
      let aiResponseContent;

      if (isGemini) {
        // Gemini格式
        if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) {
          aiResponseContent = data.candidates[0].content.parts[0].text || '';
        }
      } else {
        // OpenAI格式
        aiResponseContent = data.choices?.[0]?.message?.content || '';
      }

      console.log('AI生成的提问:', aiResponseContent);

      // 按行分割提问内容
      const questions = aiResponseContent
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .map(line => {
          // 清理每行：去除序号（如 "1. "、"- "等）、引号
          return line
            .replace(/^\d+[\.\)、]\s*/, '') // 去除数字序号
            .replace(/^[-•]\s*/, '') // 去除短横线或项目符号
            .replace(/^["「『]|["」』]$/g, '') // 去除引号
            .trim();
        })
        .filter(q => q.length > 0); // 再次过滤空行

      if (questions.length === 0) {
        throw new Error('AI返回了空的提问内容');
      }

      console.log(`✅ 解析到 ${questions.length} 个提问:`, questions);

      // 为每个提问创建对象并添加到数组
      const newQuestions = questions.map((question, index) => ({
        id: `q_${Date.now()}_${index}_${Math.random().toString(36).substr(2, 9)}`,
        question: question,
        answer: '', // 初始为空，用户可以编辑回复
        date: new Date().toISOString(),
      }));

      // 批量添加到最前面
      askboxData.answeredQuestions.unshift(...newQuestions);

      // 保存到数据库
      await saveAskboxDataToDB();

      // 重新渲染提问列表
      renderAnsweredQuestions();

      showXToast(`你有 ${newQuestions.length} 个新的提问请查收`, 'success');
    } catch (error) {
      console.error('生成提问失败:', error);
      showXToast(`生成失败: ${error.message}`, 'error');
    }
  }

  // 渲染已回答的提问列表
  function renderAnsweredQuestions() {
    const container = document.getElementById('answered-questions-list');
    const titleEl = document.getElementById('answered-questions-title');
    if (!container) return;

    if (askboxData.answeredQuestions.length === 0) {
      // 隐藏标题
      if (titleEl) titleEl.style.display = 'none';

      container.innerHTML = `
        <div style="
          text-align: center;
          color: rgba(255,255,255,0.6);
          font-size: 14px;
          padding: 40px 20px;
        ">
          暂无提问
        </div>
      `;
      return;
    }

    // 显示标题
    if (titleEl) titleEl.style.display = 'block';

    container.innerHTML = askboxData.answeredQuestions
      .map((q, index) => {
        const date = new Date(q.date);
        const dateStr = date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' });
        const isSelected = selectedQuestions.has(q.id);

        return `
      <div 
        class="askbox-question-item"
        data-question-id="${q.id}"
        style="
        background-color: rgba(255,255,255,0.9);
        backdrop-filter: blur(10px);
        border-radius: 16px;
        overflow: hidden;
        margin-bottom: 16px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transition: all 0.2s;
        ${isSelected ? 'border: 3px solid #1d9bf0; background-color: rgba(29, 155, 240, 0.1);' : ''}
        ${isAskboxMultiSelectMode ? 'border-left: 3px solid #1d9bf0;' : ''}
      " 
      onmouseover="if(!${isAskboxMultiSelectMode}){this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 16px rgba(0,0,0,0.2)';}"
      onmouseout="if(!${isAskboxMultiSelectMode}){this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.15)';}"
      onmousedown="startQuestionLongPress('${q.id}')"
      onmouseup="endQuestionLongPress()"
      onmouseleave="endQuestionLongPress()"
      ontouchstart="startQuestionLongPress('${q.id}')"
      ontouchend="endQuestionLongPress()"
      onclick="if(${isAskboxMultiSelectMode}){toggleQuestionSelection('${q.id}');event.stopPropagation();}"
      >
        <!-- 提问区域（浅黑灰色） -->
        <div style="
          background: linear-gradient(135deg, #3a3a3a 0%, #2a2a2a 100%);
          padding: 20px;
          color: #fff;
        ">
          <div style="font-size: 15px; line-height: 1.6; word-break: break-word;">
            ${q.question}
          </div>
        </div>
        
        <!-- 回复区域（白色，可编辑） -->
        <div style="
          background-color: #fff;
          padding: 20px;
          min-height: 60px;
          color: #333;
        ">
          <div id="answer-${q.id}" 
            contenteditable="true"
            data-question-id="${q.id}"
            style="
              font-size: 14px; 
              line-height: 1.6; 
              word-break: break-word;
              outline: none;
              cursor: text;
              min-height: 20px;
              ${q.answer ? '' : 'color: #999; text-align: center;'}
            "
            onblur="saveQuestionAnswer('${q.id}')"
            onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();this.blur();}"
            onfocus="if(this.textContent==='点击此处回复...'){this.textContent='';this.style.color='#333';this.style.textAlign='left';}">${
              q.answer || '点击此处回复...'
            }</div>
        </div>
        
        <!-- 日期标签 -->
        <div style="
          background-color: #f5f5f5;
          padding: 8px 20px;
          color: #999;
          font-size: 12px;
          text-align: right;
        ">
          ${dateStr}
        </div>
      </div>
    `;
      })
      .join('');
  }

  // 保存提问回复（原处编辑）
  async function saveQuestionAnswer(questionId) {
    const answerEl = document.getElementById(`answer-${questionId}`);
    if (!answerEl) return;

    const question = askboxData.answeredQuestions.find(q => q.id === questionId);
    if (!question) return;

    let newAnswer = answerEl.textContent.trim();

    // 如果是占位符文本，则清空
    if (newAnswer === '点击此处回复...') {
      newAnswer = '';
    }

    if (newAnswer !== question.answer) {
      question.answer = newAnswer;
      await saveAskboxDataToDB();
      console.log('✅ 回复已自动保存:', questionId);
    }
  }

  // ============================================
  // 提问箱多选删除功能
  // ============================================

  // 开始长按提问卡片
  function startQuestionLongPress(questionId) {
    if (isAskboxMultiSelectMode) return; // 已经在多选模式，不需要长按

    questionLongPressTimer = setTimeout(() => {
      enterAskboxMultiSelectMode();
      toggleQuestionSelection(questionId);
    }, 500); // 长按500ms触发
  }

  // 结束长按
  function endQuestionLongPress() {
    if (questionLongPressTimer) {
      clearTimeout(questionLongPressTimer);
      questionLongPressTimer = null;
    }
  }

  // 切换提问选择状态
  function toggleQuestionSelection(questionId) {
    if (!isAskboxMultiSelectMode) {
      enterAskboxMultiSelectMode();
    }

    const questionEl = document.querySelector(`.askbox-question-item[data-question-id="${questionId}"]`);
    if (!questionEl) return;

    if (selectedQuestions.has(questionId)) {
      selectedQuestions.delete(questionId);
      questionEl.style.border = '';
      questionEl.style.backgroundColor = 'rgba(255,255,255,0.9)';
    } else {
      selectedQuestions.add(questionId);
      questionEl.style.border = '3px solid #1d9bf0';
      questionEl.style.backgroundColor = 'rgba(29, 155, 240, 0.1)';
    }

    updateAskboxDeleteUI();
  }

  // 进入提问箱多选模式
  function enterAskboxMultiSelectMode() {
    isAskboxMultiSelectMode = true;

    // 显示删除工具栏
    showAskboxDeleteToolbar();

    // 改变所有提问卡片的样式
    document.querySelectorAll('.askbox-question-item').forEach(item => {
      item.style.borderLeft = '3px solid #1d9bf0';
    });

    console.log('✅ 已进入提问箱多选模式');
  }

  // 退出提问箱多选模式
  function exitAskboxMultiSelectMode() {
    isAskboxMultiSelectMode = false;
    selectedQuestions.clear();

    // 隐藏删除工具栏
    hideAskboxDeleteToolbar();

    // 恢复所有提问卡片的样式
    document.querySelectorAll('.askbox-question-item').forEach(item => {
      item.style.border = '';
      item.style.borderLeft = '';
      item.style.backgroundColor = 'rgba(255,255,255,0.9)';
    });

    console.log('✅ 已退出提问箱多选模式');
  }

  // 显示提问箱删除工具栏
  function showAskboxDeleteToolbar() {
    let toolbar = document.getElementById('askbox-delete-toolbar');
    if (!toolbar) {
      toolbar = document.createElement('div');
      toolbar.id = 'askbox-delete-toolbar';
      toolbar.style.cssText = `
        position: fixed;
        bottom: 80px;
        left: 50%;
        transform: translateX(-50%);
        background-color: rgba(0,0,0,0.95);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255,255,255,0.2);
        border-radius: 24px;
        padding: 12px 20px;
        display: flex;
        align-items: center;
        gap: 16px;
        z-index: 2000；
        box-shadow: 0 4px 20px rgba(0,0,0,0.5);
      `;

      toolbar.innerHTML = `
        <button onclick="selectAllQuestions()" style="
          background-color: #1d9bf0; 
          color: #fff; 
          border: none; 
          border-radius: 20px; 
          padding: 8px 16px; 
          font-size: 14px; 
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        " onmouseover="this.style.backgroundColor='#1a8cd8'" onmouseout="this.style.backgroundColor='#1d9bf0'">
          全选
        </button>
        <span id="askbox-selected-count" style="color: #fff; font-size: 14px; font-weight: 500;">已选择 0 个</span>
        <button onclick="deleteSelectedQuestions()" style="
          background-color: #f91880; 
          color: #fff; 
          border: none; 
          border-radius: 20px; 
          padding: 8px 16px; 
          font-size: 14px; 
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        " onmouseover="this.style.backgroundColor='#d0155f'" onmouseout="this.style.backgroundColor='#f91880'">
          删除
        </button>
        <button onclick="exitAskboxMultiSelectMode()" style="
          background-color: rgba(255,255,255,0.15); 
          color: #fff; 
          border: none; 
          border-radius: 20px; 
          padding: 8px 16px; 
          font-size: 14px; 
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        " onmouseover="this.style.backgroundColor='rgba(255,255,255,0.25)'" onmouseout="this.style.backgroundColor='rgba(255,255,255,0.15)'">
          取消
        </button>
      `;

      document.body.appendChild(toolbar);
    }
    toolbar.style.display = 'flex';
  }

  // 隐藏提问箱删除工具栏
  function hideAskboxDeleteToolbar() {
    const toolbar = document.getElementById('askbox-delete-toolbar');
    if (toolbar) {
      toolbar.style.display = 'none';
    }
  }

  // 更新提问箱删除UI
  function updateAskboxDeleteUI() {
    const countEl = document.getElementById('askbox-selected-count');
    if (countEl) {
      countEl.textContent = `已选择 ${selectedQuestions.size} 个`;
    }
  }

  // 全选提问
  function selectAllQuestions() {
    document.querySelectorAll('.askbox-question-item').forEach(item => {
      const questionId = item.dataset.questionId;
      if (!selectedQuestions.has(questionId)) {
        selectedQuestions.add(questionId);
        item.style.border = '3px solid #1d9bf0';
        item.style.backgroundColor = 'rgba(29, 155, 240, 0.1)';
      }
    });
    updateAskboxDeleteUI();
  }

  // 删除选中的提问
  async function deleteSelectedQuestions() {
    if (selectedQuestions.size === 0) {
      showXToast('请先选择要删除的提问', 'warning');
      return;
    }

    const confirmDelete = confirm(`确定要删除选中的 ${selectedQuestions.size} 个提问吗？删除后无法恢复。`);
    if (!confirmDelete) return;

    try {
      // 过滤掉选中的提问
      askboxData.answeredQuestions = askboxData.answeredQuestions.filter(q => !selectedQuestions.has(q.id));

      // 保存到数据库
      await saveAskboxDataToDB();

      showXToast(`已删除 ${selectedQuestions.size} 个提问`, 'success');

      // 退出多选模式并刷新显示
      exitAskboxMultiSelectMode();
      renderAnsweredQuestions();
    } catch (error) {
      console.error('删除提问失败:', error);
      showXToast('删除失败: ' + error.message, 'error');
    }
  }

  // ============================================
  // 第五部分: 暴露全局接口
  // ============================================

  // 将必要的函数暴露到全局作用域
  window.renderXSocialScreenProxy = renderXSocialScreen;
  window.switchXPage = switchXPage;
  window.switchHomeTab = switchHomeTab;
  window.refreshXTweets = refreshXTweets;
  window.showTweetComments = showTweetComments;
  window.submitComment = submitComment;
  window.handleCommentInput = handleCommentInput;
  window.autoResize = autoResize;
  window.showReplyInput = showReplyInput;
  window.cancelReply = cancelReply;
  window.submitReply = submitReply;
  window.handleReplyInput = handleReplyInput;
  window.autoResizeReply = autoResizeReply;
  window.toggleLike = toggleLike;
  window.toggleCommentLike = toggleCommentLike;
  window.deleteUserComment = deleteUserComment;
  window.showSensitiveContent = showSensitiveContent;
  window.handleQuotedTweetClick = handleQuotedTweetClick;
  window.handleQuoteRetweetFromData = handleQuoteRetweetFromData;
  window.openComposeTweetModal = openComposeTweetModal;
  window.closeComposeTweetModal = closeComposeTweetModal;
  window.publishTweet = publishTweet;
  window.handleComposeInput = handleComposeInput;
  window.processHashtagsAndMentions = processHashtagsAndMentions;
  window.toggleImageSection = toggleImageSection;
  window.selectImageMethod = selectImageMethod;
  window.triggerImageUpload = triggerImageUpload;
  window.handleImageUpload = handleImageUpload;
  window.saveImageData = saveImageData;
  window.removeImage = removeImage;
  window.toggleLocationSection = toggleLocationSection;
  window.saveLocationData = saveLocationData;
  window.removeLocation = removeLocation;
  window.toggleLinkSection = toggleLinkSection;
  window.saveLinkData = saveLinkData;
  window.removeLink = removeLink;
  window.triggerLinkImageUpload = triggerLinkImageUpload;
  window.handleLinkImageUpload = handleLinkImageUpload;
  window.removeQuoteContent = removeQuoteContent;
  window.togglePrivacySettings = togglePrivacySettings;
  window.editProfile = editProfile;
  window.openEditProfileModal = openEditProfileModal;
  window.closeEditProfileModal = closeEditProfileModal;
  window.saveProfileChanges = saveProfileChanges;
  window.switchProfileTab = switchProfileTab;
  window.toggleProfileMenu = toggleProfileMenu;
  window.openAccountManager = openAccountManager;
  window.updateCharacterCounts = updateCharacterCounts;
  window.toggleRealNameInput = toggleRealNameInput;
  window.updateTag1ColorFromText = updateTag1ColorFromText;
  window.updateTag1ColorFromPicker = updateTag1ColorFromPicker;
  window.updateTag2ColorFromText = updateTag2ColorFromText;
  window.updateTag2ColorFromPicker = updateTag2ColorFromPicker;
  window.editCoverImage = editCoverImage;
  window.removeCoverImage = removeCoverImage;
  window.editAvatarImage = editAvatarImage;
  window.updateVerificationTypeUI = updateVerificationTypeUI;
  window.toggleCharacterBinding = toggleCharacterBinding;
  window.toggleCharacterSelection = toggleCharacterSelection;
  window.openCharacterXProfile = openCharacterXProfile;
  window.closeCharacterXProfileModal = closeCharacterXProfileModal;
  window.saveCharacterXProfile = saveCharacterXProfile;
  window.updateCharacterXAvatar = updateCharacterXAvatar;
  window.updateCharacterBioCount = updateCharacterBioCount;
  window.toggleCharacterRealNameInput = toggleCharacterRealNameInput;
  window.openAddRelationshipModal = openAddRelationshipModal;
  window.editRelationship = editRelationship;
  window.deleteRelationship = deleteRelationship;
  window.closeRelationshipModal = closeRelationshipModal;
  window.updateRelationshipDescCount = updateRelationshipDescCount;
  window.saveRelationshipForm = saveRelationshipForm;
  window.saveXSettings = saveXSettings;
  window.saveXPreset = saveXPreset;
  window.loadXPreset = loadXPreset;
  window.deleteXPreset = deleteXPreset;
  window.exportXData = exportXData;
  window.importXData = importXData;
  window.showTweetDetail = showTweetDetail;
  window.handleDetailCommentInput = handleDetailCommentInput;
  window.autoResizeDetail = autoResizeDetail;
  window.submitDetailComment = submitDetailComment;
  window.toggleDetailLike = toggleDetailLike;
  window.rerollAIReplies = rerollAIReplies;
  window.toggleTweetSelection = toggleTweetSelection;
  window.enterMultiSelectMode = enterMultiSelectMode;
  window.exitMultiSelectMode = exitMultiSelectMode;
  window.selectAllTweets = selectAllTweets;
  window.deleteSelectedTweets = deleteSelectedTweets;
  window.showXToast = showXToast;
  window.toggleIdentityCharacter = toggleIdentityCharacter;
  window.closeAccountManager = closeAccountManager;
  window.switchAccount = switchAccount;
  window.createNewAccount = createNewAccount;
  window.deleteAccount = deleteAccount;
  window.triggerCommentImageUpload = triggerCommentImageUpload;
  window.handleCommentImageUpload = handleCommentImageUpload;
  window.removeCommentImage = removeCommentImage;
  window.triggerDetailCommentImageUpload = triggerDetailCommentImageUpload;
  window.handleDetailCommentImageUpload = handleDetailCommentImageUpload;
  window.removeDetailCommentImage = removeDetailCommentImage;

  // NPC绑定相关函数
  window.toggleNPCBinding = toggleNPCBinding;
  window.openCreateNPCModal = openCreateNPCModal;
  window.editNPC = editNPC;
  window.saveNPC = saveNPC;
  window.deleteNPC = deleteNPC;
  window.closeNPCEditModal = closeNPCEditModal;

  // 提问箱相关函数
  window.loadAskboxData = loadAskboxData;
  window.changeAskboxAvatar = changeAskboxAvatar;
  window.saveAskboxNickname = saveAskboxNickname;
  window.saveAskboxPrompt = saveAskboxPrompt;
  window.openAskboxSettings = openAskboxSettings;
  window.getNewQuestion = getNewQuestion;
  window.saveQuestionAnswer = saveQuestionAnswer;

  // 提问箱多选删除相关函数
  window.startQuestionLongPress = startQuestionLongPress;
  window.endQuestionLongPress = endQuestionLongPress;
  window.toggleQuestionSelection = toggleQuestionSelection;
  window.enterAskboxMultiSelectMode = enterAskboxMultiSelectMode;
  window.exitAskboxMultiSelectMode = exitAskboxMultiSelectMode;
  window.selectAllQuestions = selectAllQuestions;
  window.deleteSelectedQuestions = deleteSelectedQuestions;

  // 搜索页面相关函数
  window.switchSearchTab = switchSearchTab;
  window.handleTrendingClick = handleTrendingClick;
  window.handleTrendingMore = handleTrendingMore;
  window.openAddCategoryModal = openAddCategoryModal;
  window.closeCategoryModal = closeCategoryModal;
  window.addNewCategory = addNewCategory;
  window.deleteCategory = deleteCategory;
  window.toggleCategory = toggleCategory;
  window.updateCategoryName = updateCategoryName;
  window.updateCategoryDescription = updateCategoryDescription;
  window.saveCustomCategories = saveCustomCategories;
  window.refreshTrends = refreshTrends;
  window.toggleSearchButton = toggleSearchButton;
  window.performSearch = performSearch;
  window.switchSearchResultTab = switchSearchResultTab;
  window.backToTrending = backToTrending;

  console.log('✅ 全局接口已暴露');

  // 创建 XSocialApp 对象以兼容HTML检查
  window.XSocialApp = {
    init: initXSocialApp,
    render: renderXSocialScreen,
    version: '1.0',
    isLoaded: true,
  };

  // 自动初始化（如果DOM已加载）
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initXSocialApp);
  } else {
    // 延迟初始化，确保其他脚本先加载
    setTimeout(initXSocialApp, 100);
  }

  console.log('📦 X Social App 模块已加载，版本: 1.0');
})(window);

// ==========================================
// 使用说明:
//
// 1. 在HTML中引入此文件:
//    <script src="x-social-app.js" defer></script>
//
// 2. 系统会自动初始化,创建X社交页面HTML结构
//
// 3. 通过以下方式调用:
//    - 显示X社交页面: showScreen('x-social-screen')
//    - 渲染代理: window.renderXSocialScreenProxy()
//
// 4. 需要的依赖:
//    - Dexie.js (数据库)
//    - 确保有 showScreen() 全局函数
//
// ==========================================
