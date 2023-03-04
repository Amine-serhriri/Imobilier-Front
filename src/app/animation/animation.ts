import { trigger, state, style, animate, transition } from '@angular/animations';

export function visibility() {
    return trigger('visibility', [
        state('shown', style({
            transform: 'scale(1.0)',
            opacity: 1
        })),
        state('hidden', style({
            transform: 'scale(0.5)',
            opacity: 0
        })),
        transition('hidden => shown', animate('0.5s ease-in-out'))
    ]);
}

export function flyInOut() {
  return trigger('flyInOut', [
      state('*', style({ opacity: 1, transform: 'translateX(0)'})),
      transition(':enter', [
          style({ transform: 'translateX(-100%)', opacity: 0 }),
          animate('500ms ease-in')
      ]),
      transition(':leave', [
          animate('200ms ease-out', style({ transform: 'translateX(100%)', opacity: 0}))
      ])
  ]);
}


export function expand() {
  return trigger('expand', [
      state('*', style({ opacity: 1, transform: 'translateX(0)' })),
      transition(':enter', [
          style({ transform: 'translateY(-50%)', opacity:0 }),
          animate('1s ease-in', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
  ]);
}
export function showSpinner(){
  return trigger('showSpinner',[
    state('hidden',style({
      transform: 'scale(1.5)',
      opacity: 0
    })),
    state('spinner',style({
      transform: 'scale(2)',
      opacity: 1
    })),
    transition('void => *',animate('15s ease-in'))
  ])
}
export function showForm(){
  return trigger('showForm',[

    state('spinner',style({
      transform: 'scale(1.0)',
      opacity: 1
    })),
    state('hidden',style({
      transform: 'scale(0.5)',
      opacity: 0
    })),
    transition('hidden=>spinner',
      animate('8s')
  )])
}
