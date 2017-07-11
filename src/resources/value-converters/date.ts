import { autoinject } from 'aurelia-framework';
// import { EventAggregator, Subscription } from 'aurelia-event-aggregator';
import { I18N } from 'aurelia-i18n';

@autoinject()
export class DateValueConverter {
  constructor(/*private ea: EventAggregator,*/ private i18n: I18N) {
    // this.ea.subscribe('i18n:locale:changed')
  }

  toView(value: Date): string {
    const locale = this.i18n.getLocale();
    const options = {
      year: 'numeric', month: '2-digit', day: '2-digit'
    };
    const df = this.i18n.df(options, locale);
    return df.format(value);
  }
}
