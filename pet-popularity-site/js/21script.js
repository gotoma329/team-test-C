document.addEventListener('DOMContentLoaded', function() {
    const petTrends = [
        { name: '猫', popularity: '高まる', reason: 'リモートワークの増加で室内飼いが増加' },
        { name: '小型犬', popularity: '高まる', reason: '都市部での飼いやすさ' },
        { name: 'ウサギ', popularity: '注目', reason: 'ペットとしての可愛さと手軽さ' },
        { name: 'フェレット', popularity: '増加', reason: 'ユニークな性格と遊び好き' },
        { name: '爬虫類', popularity: '人気上昇', reason: '新しいペットとしての興味' }
    ];

    const petList = document.getElementById('pet-list');

    petTrends.forEach(pet => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<strong>${pet.name}</strong>: ${pet.popularity} - ${pet.reason}`;
        petList.appendChild(listItem);
    });

    const button = document.getElementById('refresh-button');
    button.addEventListener('click', function() {
        alert('最新のペットトレンドを更新しました！');
        // ここでデータを再取得する処理を追加できます
    });
});