/**
 * 07script.js - 歴史を振り返るページのインタラクション
 * 
 * 概要：
 * このファイルは「歴史を振り返る」ページの動的なインタラクションを管理します。
 * シンプルでありながらワクワクする体験を提供することを目的としています。
 * 
 * 主な機能：
 * - タイムラインの段階的表示アニメーション
 * - 統計数字のリアルタイムカウントアップ
 * - スクロール連動型のエフェクト
 * - ホバーやクリックによるインタラクティブ要素
 * - 背景パーティクルエフェクト
 * - キーボードショートカット機能
 * 
 * 技術仕様：
 * - ES6+ JavaScript機能を使用
 * - Intersection Observer APIでパフォーマンス最適化
 * - CSS-in-JSによる動的スタイル制御
 * 
 * 作成日：2025年10月
 * 更新日：2025年10月22日
 */

// =============================================================================
// メイン初期化処理
// =============================================================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('歴史ページの初期化を開始...');
    
    try {
        // アニメーション初期化
        initializeAnimations();
        
        // インタラクティブ機能設定
        setupInteractiveFeatures();
        
        // ビジュアルエフェクト作成
        createVisualEffects();
        
        console.log('歴史ページの初期化が完了しました');
    } catch (error) {
        console.error('初期化中にエラーが発生しました:', error);
    }
});

/**
 * 全てのアニメーションを初期化する関数
 */
function initializeAnimations() {
    setTimelineAnimations();
    animateStatNumbers();
    setupScrollAnimations();
}

/**
 * インタラクティブ機能を設定する関数
 */
function setupInteractiveFeatures() {
    setupInteractiveEffects();
    setupKeyboardShortcuts();
}

/**
 * ビジュアルエフェクトを作成する関数
 */
function createVisualEffects() {
    createParticleEffect();
    showWelcomeMessage();
}

// =============================================================================
// タイムラインアニメーション
// =============================================================================
/**
 * タイムラインアニメーションの設定
 */
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

// =============================================================================
// 統計数字アニメーション
// =============================================================================

/**
 * 統計数字のカウントアップアニメーション
 */
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

/**
 * 数字カウントアップの実行
 * @param {HTMLElement} element - 対象の要素
 * @param {number} target - 目標値
 */
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

// =============================================================================
// スクロール連動アニメーション
// =============================================================================

/**
 * スクロールアニメーションの設定
 */
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

// =============================================================================
// インタラクティブエフェクト
// =============================================================================

/**
 * インタラクティブエフェクトの設定
 */
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

// =============================================================================
// キーボードショートカット
// =============================================================================

/**
 * キーボードショートカットを設定する関数
 */
function setupKeyboardShortcuts() {
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
        
        // Ctrl+Hでホームへ移動
        if (e.code === 'KeyH' && e.ctrlKey) {
            e.preventDefault();
            const homeLink = document.querySelector('a[href*="index.html"]');
            if (homeLink) {
                homeLink.click();
            }
        }
    });
}

// =============================================================================
// ウェルカムメッセージ
// =============================================================================

/**
 * ページ読み込み完了時のウェルカムメッセージを表示する関数
 */
function showWelcomeMessage() {
    window.addEventListener('load', function() {
        setTimeout(() => {
            const welcomeMsg = createWelcomeElement();
            document.body.appendChild(welcomeMsg);
            
            // フェードイン
            setTimeout(() => {
                welcomeMsg.style.opacity = '1';
            }, 100);
            
            // フェードアウトと削除
            setTimeout(() => {
                welcomeMsg.style.opacity = '0';
                setTimeout(() => {
                    welcomeMsg.remove();
                }, 500);
            }, 2000);
        }, 1000);
    });
}

/**
 * ウェルカムメッセージ要素を作成する関数
 */
function createWelcomeElement() {
    const welcomeMsg = document.createElement('div');
    welcomeMsg.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(74, 144, 226, 0.95);
        color: white;
        padding: 20px 40px;
        border-radius: 15px;
        font-size: 1.2rem;
        z-index: 1000;
        opacity: 0;
        transition: all 0.5s ease;
        font-weight: 600;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    `;
    welcomeMsg.textContent = '🎉 歴史の旅にようこそ！';
    return welcomeMsg;
}

// =============================================================================
// 動的CSSアニメーション
// =============================================================================

/**
 * JavaScriptから動的に追加するCSSアニメーション
 * タイムラインマーカーやグラデーション効果など、
 * インタラクション時に必要となるアニメーションを定義
 */
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

/**
 * 動的スタイルをページに追加する関数
 */
function addDynamicStyles() {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = dynamicStyles;
    document.head.appendChild(styleSheet);
}

// 動的スタイルを追加
addDynamicStyles();