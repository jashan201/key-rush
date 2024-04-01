

class Score {
  #date;
  #hits;
  #percentage;

  constructor(date, hits, percentage) {
      this.#date = date;
      this.#hits = hits;
      this.#percentage = percentage;
  }



  set date(date){
    this.#date = date;
  }

  set hits(hits){
    this.#hits = hits;
  }

  set percentage(percentage){
    this.#percentage = percentage;
  }


  get date() {
      return this.#date;
  }

  get hits() {
      return this.#hits;
  }

  get percentage() {
    return this.#percentage;
  }



}  
// const scoreObject = new Score(new Date(), hitsCounter, calculatePercentage(hitsCounter));


export default Score;
