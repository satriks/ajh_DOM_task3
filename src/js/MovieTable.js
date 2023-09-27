import data from '../data/data.json';

export default class MovieTable {
  constructor() {
    this.rowsData = data;
    this.table = document.querySelector('table');
    this.metods = ['idSort', 'idSortReverse', 'titleSort', 'titleSortReverse', 'yearSort', 'yearSortReverse', 'imdbSort', 'imdbSortReverse'];
    this.metodsIndex = 0;
    this.upArr = this.createUpArr();
    this.downArr = this.createDownArr();
    this.currentRows = [];
  }

  loopMetod() {
    this.drawTable(this.getMetod(this.metods[this.metodsIndex]));
    this.metodsIndex += 1;
    if (this.metodsIndex > this.metods.length - 1) {
      this.metodsIndex = 0;
    }
  }

  getMetod(name) {
    switch (name) {
      case 'idSort': {
        this.upArr.remove();
        document.querySelector('.table_title_id').insertAdjacentElement('beforeend', this.downArr);
        return this.idSort(); }

      case 'idSortReverse': {
        this.downArr.remove();
        document.querySelector('.table_title_id').insertAdjacentElement('beforeend', this.upArr);
        return this.idSort().reverse(); }

      case 'titleSort': {
        this.upArr.remove();
        document.querySelector('.table_title_title').insertAdjacentElement('beforeend', this.downArr);
        return this.titleSort(); }

      case 'titleSortReverse': {
        this.downArr.remove();
        document.querySelector('.table_title_title').insertAdjacentElement('beforeend', this.upArr);
        return this.titleSort().reverse(); }

      case 'yearSort': {
        this.upArr.remove();
        document.querySelector('.table_title_year').insertAdjacentElement('beforeend', this.downArr);
        return this.yearSort(); }

      case 'yearSortReverse': {
        this.downArr.remove();
        document.querySelector('.table_title_year').insertAdjacentElement('beforeend', this.upArr);
        return this.yearSort().reverse(); }

      case 'imdbSort': {
        this.upArr.remove();
        document.querySelector('.table_title_imdb').insertAdjacentElement('beforeend', this.downArr);
        return this.imdbSort(); }

      case 'imdbSortReverse': {
        this.downArr.remove();
        document.querySelector('.table_title_imdb').insertAdjacentElement('beforeend', this.upArr);
        return this.imdbSort().reverse(); }

      default: throw new Error('нет такого метода сортировки');
    }
  }

  drawTable(rows) {
    for (const oldRow of this.currentRows) {
      oldRow.remove();
    }
    for (const row of rows) {
      const tr = document.createElement('tr');

      const tdID = document.createElement('td');
      tdID.innerText = row.id;
      tr.insertAdjacentElement('beforeend', tdID);

      const tdTitle = document.createElement('td');
      tdTitle.innerText = row.title;
      tr.insertAdjacentElement('beforeend', tdTitle);

      const tdYear = document.createElement('td');
      tdYear.innerText = `(${row.year})`;
      tr.insertAdjacentElement('beforeend', tdYear);

      const tdImdb = document.createElement('td');
      tdImdb.innerText = `imdb: ${row.imdb.toFixed(2)}`;
      tr.insertAdjacentElement('beforeend', tdImdb);

      this.table.insertAdjacentElement('beforeend', tr);
      this.currentRows.push(tr);
    }
  }

  idSort() {
    return [...this.rowsData].sort((a, b) => a.id - b.id);
  }

  titleSort() {
    return [...this.rowsData].sort((a, b) => (`${a.title}`).localeCompare(b.title));
  }

  yearSort() {
    return [...this.rowsData].sort((a, b) => a.year - b.year);
  }

  imdbSort() {
    return [...this.rowsData].sort((a, b) => a.imdb - b.imdb);
  }

  createUpArr() {
    const up = document.createElement('p');
    up.innerHTML = ' &#8593';
    return up;
  }

  createDownArr() {
    const down = document.createElement('p');
    down.innerHTML = ' &#8595';
    return down;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const tab = new MovieTable();
  tab.drawTable(tab.rowsData)
  setInterval(tab.loopMetod.bind(tab), 2000);
});
