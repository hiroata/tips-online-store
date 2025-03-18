// common.js
document.addEventListener('DOMContentLoaded', function() {
    // ヘッダーとフッターの読み込み
    loadComponent('header-placeholder', 'components/header.html');
    loadComponent('footer-placeholder', 'components/footer.html');
    
    // ログインモーダル
    const modal = document.getElementById("loginModal");
    const loginBtn = document.getElementById("loginBtn");
    const closeBtn = document.querySelector(".close");
    
    if (loginBtn) {
        loginBtn.addEventListener("click", function(e) {
            e.preventDefault();
            modal.style.display = "block";
        });
    }
    
    if (closeBtn) {
        closeBtn.addEventListener("click", function() {
            modal.style.display = "none";
        });
    }
    
    window.addEventListener("click", function(e) {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
    
    // ログインフォーム送信処理
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 実際の認証処理はここに実装します
            // デモ用の簡易ログイン処理
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            if (email && password) {
                // ローカルストレージにログイン状態を保存（実際はトークンなどを使用）
                localStorage.setItem('isLoggedIn', 'true');
                
                // UI更新
                updateLoginState();
                
                // モーダルを閉じる
                modal.style.display = "none";
            }
        });
    }
    
    // ログイン状態によるUI更新
    updateLoginState();
    
    // フィルターボタンのドロップダウン処理
    const filterBtn = document.querySelector('.filter-btn');
    const filterDropdown = document.querySelector('.filter-dropdown');
    
    if (filterBtn && filterDropdown) {
        filterBtn.addEventListener('click', function() {
            filterDropdown.classList.toggle('show');
        });
        
        // ドロップダウン外クリックで閉じる
        window.addEventListener('click', function(e) {
            if (!e.target.matches('.filter-btn') && !e.target.closest('.filter-dropdown')) {
                if (filterDropdown.classList.contains('show')) {
                    filterDropdown.classList.remove('show');
                }
            }
        });
    }
    
    // お気に入りボタンの処理
    const favBtns = document.querySelectorAll('.favorite-btn');
    favBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            icon.classList.toggle('far');
            icon.classList.toggle('fas');
        });
    });
});

// コンポーネント読み込み関数
function loadComponent(targetId, url) {
    const target = document.getElementById(targetId);
    if (!target) return;
    
    fetch(url)
        .then(response => response.text())
        .then(data => {
            target.innerHTML = data;
            
            // ヘッダーが読み込まれた後にログインボタンのイベントを再設定
            if (targetId === 'header-placeholder') {
                const loginBtn = document.getElementById("loginBtn");
                const userProfile = document.getElementById("userProfile");
                
                if (loginBtn) {
                    loginBtn.addEventListener("click", function(e) {
                        e.preventDefault();
                        const modal = document.getElementById("loginModal");
                        modal.style.display = "block";
                    });
                }
                
                // ログイン状態の更新
                updateLoginState();
            }
        })
        .catch(error => {
            console.error(`コンポーネントの読み込みに失敗しました: ${url}`, error);
        });
}

// ログイン状態によるUI更新
function updateLoginState() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const loginBtn = document.getElementById("loginBtn");
    const userProfile = document.getElementById("userProfile");
    
    if (loginBtn && userProfile) {
        if (isLoggedIn) {
            loginBtn.style.display = "none";
            userProfile.style.display = "block";
        } else {
            loginBtn.style.display = "block";
            userProfile.style.display = "none";
        }
    }
}
