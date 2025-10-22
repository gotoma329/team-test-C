// 07script.js - 歴史を振り返るページのインタラクション

document.addEventListener('DOMContentLoaded', function() {
    // アニメーション遅延の設定
    setTimelineAnimations();
    
    // 数字カウントアップアニメーション
    animateStatNumbers();
    
    // スクロールアニメーション
    setupScrollAnimations();
    
    // インタラクティブエフェクト
    setupInteractiveEffects();
    
    // パーティクルエフェクト
    createParticleEffect();
});

// タイムラインアニメーションの設定
function setTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        // 遅延を設定してアニメーションを実行
        item.style.animationDelay = `${index * 0.3}s`;
        
        // ホバーエフェクトの追加
        item.addEventListener('mouseenter', function() {
            const marker = this.querySelector('.timeline-marker');
            marker.style.transform = 'translateX(-50%) scale(1.3) rotate(360deg)';
            marker.style.transition = 'all 0.5s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            const marker = this.querySelector('.timeline-marker');
            marker.style.transform = 'translateX(-50%) scale(1)';
        });
    });
}

// 統計数字のカウントアップアニメーション
function animateStatNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateNumber(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(number => {
        observer.observe(number);
    });
}

// 数字カウントアップの実行
function animateNumber(element, target) {
    const duration = 2000; // 2秒
    const startTime = performance.now();
    const startValue = 0;
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // イージング関数（ease-out）
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(startValue + (target - startValue) * easeProgress);
        
        element.textContent = currentValue.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        } else {
            element.textContent = target.toLocaleString();
            // 完了時のエフェクト
            element.style.transform = 'scale(1.1)';
            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, 200);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// スクロールアニメーションの設定
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // タイムラインアイテムの特別なアニメーション
                if (entry.target.classList.contains('timeline-item')) {
                    const content = entry.target.querySelector('.timeline-content');
                    const marker = entry.target.querySelector('.timeline-marker');
                    
                    setTimeout(() => {
                        content.style.transform = 'translateY(0)';
                        content.style.opacity = '1';
                    }, 200);
                    
                    setTimeout(() => {
                        marker.style.animation = 'markerPop 0.6s ease-out';
                    }, 400);
                }
            }
        });
    }, observerOptions);
    
    // 観察対象の要素を追加
    document.querySelectorAll('.timeline-item, .stat-card, .message-card').forEach(el => {
        observer.observe(el);
    });
}

// インタラクティブエフェクトの設定
function setupInteractiveEffects() {
    // カードのホバーエフェクト
    const cards = document.querySelectorAll('.stat-card, .timeline-content, .message-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });
    
    // タイトルのインタラクティブエフェクト
    const title = document.querySelector('.title');
    if (title) {
        title.addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(45deg, #4a90e2, #ff6b6b, #4a90e2)';
            this.style.backgroundSize = '200% 200%';
            this.style.backgroundClip = 'text';
            this.style.webkitBackgroundClip = 'text';
            this.style.color = 'transparent';
            this.style.animation = 'gradientShift 2s ease-in-out infinite';
        });
        
        title.addEventListener('mouseleave', function() {
            this.style.background = '';
            this.style.backgroundClip = '';
            this.style.webkitBackgroundClip = '';
            this.style.color = 'white';
            this.style.animation = 'titlePulse 2s ease-in-out infinite alternate';
        });
    }
    
    // スムーズスクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// パーティクルエフェクトの作成
function createParticleEffect() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    // パーティクルコンテナを作成
    const particleContainer = document.createElement('div');
    particleContainer.style.position = 'absolute';
    particleContainer.style.top = '0';
    particleContainer.style.left = '0';
    particleContainer.style.width = '100%';
    particleContainer.style.height = '100%';
    particleContainer.style.pointerEvents = 'none';
    particleContainer.style.overflow = 'hidden';
    header.style.position = 'relative';
    header.appendChild(particleContainer);
    
    // パーティクルを生成
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            createParticle(particleContainer);
        }, i * 200);
    }
    
    // 継続的にパーティクルを生成
    setInterval(() => {
        createParticle(particleContainer);
    }, 3000);
}

// 個別パーティクルの作成
function createParticle(container) {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = '4px';
    particle.style.height = '4px';
    particle.style.background = 'rgba(255, 255, 255, 0.8)';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    
    // ランダムな開始位置
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = '100%';
    
    // ランダムなサイズ
    const size = Math.random() * 3 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    container.appendChild(particle);
    
    // アニメーション
    const animation = particle.animate([
        {
            transform: 'translateY(0) scale(1)',
            opacity: 0
        },
        {
            transform: 'translateY(-20px) scale(1)',
            opacity: 1,
            offset: 0.1
        },
        {
            transform: `translateY(-${container.offsetHeight + 50}px) scale(0.5)`,
            opacity: 0
        }
    ], {
        duration: Math.random() * 3000 + 2000,
        easing: 'ease-out'
    });
    
    animation.onfinish = () => {
        particle.remove();
    };
}

// キーボードショートカット
document.addEventListener('keydown', function(e) {
    // スペースキーでスムーズスクロール
    if (e.code === 'Space' && !e.target.matches('input, textarea')) {
        e.preventDefault();
        const windowHeight = window.innerHeight;
        window.scrollBy({
            top: windowHeight * 0.8,
            behavior: 'smooth'
        });
    }
    
    // Hキーでホームへ
    if (e.code === 'KeyH' && e.ctrlKey) {
        e.preventDefault();
        const homeLink = document.querySelector('a[href*="index.html"]');
        if (homeLink) {
            homeLink.click();
        }
    }
});

// ページ読み込み完了時のウェルカムアニメーション
window.addEventListener('load', function() {
    // ウェルカムメッセージ
    setTimeout(() => {
        const welcomeMsg = document.createElement('div');
        welcomeMsg.style.position = 'fixed';
        welcomeMsg.style.top = '50%';
        welcomeMsg.style.left = '50%';
        welcomeMsg.style.transform = 'translate(-50%, -50%)';
        welcomeMsg.style.background = 'rgba(74, 144, 226, 0.95)';
        welcomeMsg.style.color = 'white';
        welcomeMsg.style.padding = '20px 40px';
        welcomeMsg.style.borderRadius = '15px';
        welcomeMsg.style.fontSize = '1.2rem';
        welcomeMsg.style.zIndex = '1000';
        welcomeMsg.style.opacity = '0';
        welcomeMsg.style.transition = 'all 0.5s ease';
        welcomeMsg.textContent = '歴史の旅にようこそ！';
        
        document.body.appendChild(welcomeMsg);
        
        setTimeout(() => {
            welcomeMsg.style.opacity = '1';
        }, 100);
        
        setTimeout(() => {
            welcomeMsg.style.opacity = '0';
            setTimeout(() => {
                welcomeMsg.remove();
            }, 500);
        }, 2000);
    }, 1000);
});

// 動的CSSアニメーションの追加
const dynamicStyles = `
    @keyframes markerPop {
        0% { transform: translateX(-50%) scale(1); }
        50% { transform: translateX(-50%) scale(1.3); }
        100% { transform: translateX(-50%) scale(1); }
    }
    
    @keyframes gradientShift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }
    
    .animate-in {
        animation: slideInFromBottom 0.8s ease-out forwards;
    }
    
    @keyframes slideInFromBottom {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

// 動的スタイルを追加
const styleSheet = document.createElement('style');
styleSheet.textContent = dynamicStyles;
document.head.appendChild(styleSheet);