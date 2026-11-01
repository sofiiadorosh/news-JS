import './news.css';
import { Article } from '../../../types';

class News {
    public draw(data: Readonly<Article>[]): void {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector<HTMLTemplateElement>('#newsItemTemp');
        const newsContainer = document.querySelector<HTMLElement>('.news');

        if (!newsItemTemp || !newsContainer) return;

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;

            if (idx % 2) newsClone.querySelector('.news__item')?.classList.add('alt');

            const photo = newsClone.querySelector<HTMLElement>('.news__meta-photo');
            if (photo) photo.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;

            this.setText(newsClone, '.news__meta-author', item.author || item.source.name);
            this.setText(newsClone, '.news__meta-date', item.publishedAt.slice(0, 10).split('-').reverse().join('-'));
            this.setText(newsClone, '.news__description-title', item.title);
            this.setText(newsClone, '.news__description-source', item.source.name);
            this.setText(newsClone, '.news__description-content', item.description);

            newsClone.querySelector('.news__read-more a')?.setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        newsContainer.innerHTML = '';
        newsContainer.appendChild(fragment);
    }

    private setText(parent: DocumentFragment, selector: string, text: string): void {
        const element = parent.querySelector(selector);
        if (element) element.textContent = text;
    }
}

export default News;
