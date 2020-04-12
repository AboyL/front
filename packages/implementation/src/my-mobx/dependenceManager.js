let isCollecting = false
let nowObserver = null
module.exports = {
  _store: {

  },
  beginCollect (observer) {
    nowObserver = observer
  },
  endCollect () {
    nowObserver = null
  },
  _addNowObserver (obID) {
    this._store[obID] = this._store[obID] || {};
    this._store[obID].watchers = this._store[obID].watchers || [];
    this._store[obID].watchers.push(nowObserver);
  },
  collect (obId) {
    if (nowObserver) {
      this._addNowObserver(obId)
    }
  },
  trigger (id) {
    const ds = this._store[id];
    if (ds && ds.watchers) {
      ds.watchers.forEach((d) => {
        d.call(ds.target || this);
      });
    }
  },
}