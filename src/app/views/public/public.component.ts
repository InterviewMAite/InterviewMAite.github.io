import { Component } from '@angular/core';

export interface IFeature {
  title: string;
  desc: string;
}

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent {
  title = 'InterviewMAite';

  features: IFeature[] = [
    {
      title: "Real-Time Feedback",
      desc: "InterviewMAite will analyze language patterns, sentiment, and contextual cues to evaluate the quality of answers. It will provide real-time feedback to candidates during the interview process."
    },
    {
      title: "Improved Efficiency",
      desc: "InterviewMAite provides objective evaluations based on data and predefined criteria. It enables simultaneous assessments of multiple candidates, accelerating the selection process."
    },
    {
      title: "Bias-free",
      desc: "InterviewMAite provides objective evaluations based on data and predefined criteria. It minimizes the influence of biases and ensures fairness in candidate assessment."
    },
    {
      title: "Scalability",
      desc: "InterviewMAite can be easily scaled to accommodate a high volume of interviews and diverse job roles. It will offer flexibility and adaptability to meet the changing needs of organizations."
    },
    {
      title: "Cost Savings",
      desc: "By automating several aspects of the interview process, InterviewMAite reduces costs associated with manual assessments. It optimizes resource allocation and improves overall operational efficiency."
    }
  ];

  scrollTo(el: HTMLElement): void {
    el.scrollIntoView();
  }

}
