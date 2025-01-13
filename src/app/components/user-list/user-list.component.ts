import {ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {INITIAL_PAGE, TOTAL_PAGES} from "../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserListData} from "../../types/user-list-data.type";
import {AsyncPipe} from "@angular/common";
import {filter, map, Observable, Subject, takeUntil} from "rxjs";
import {animate, query, stagger, style, transition, trigger} from "@angular/animations";
import {UserCardComponent} from "../user-card/user-card.component";

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [UserCardComponent, AsyncPipe],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('listAnimation', [
      transition(':enter', [
        query('app-user-card', [
          style({opacity: 0, transform: 'translateY(20px)'}),
          stagger(100, [
            animate('300ms ease-out', style({opacity: 1, transform: 'translateY(0)'}))
          ])
        ])
      ])
    ])
  ],
})
export class UserListComponent implements OnInit, OnDestroy {
  @ViewChild('scrollToTop') scrollToTopElement!: ElementRef;

  users$: Observable<UserListData['results']> = this.activatedRoute.data.pipe(
    map((data) => data['users'].results),
    filter((users) => users.length > 0)
  );

  currentPage = INITIAL_PAGE;

  totalPages = TOTAL_PAGES;

  totalPagesArray: number[] = [];

  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.totalPagesArray = Array.from({length: this.totalPages}, (_, i) => i + 1);

    this.activatedRoute.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        this.currentPage = +params.get('page')!;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.navigateToPage(this.currentPage);
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.navigateToPage(this.currentPage);
    }
  }

  navigateToPage(pageNumber: number): void {
    this.router.navigate(['/users', pageNumber]).then(() => {
      if (this.scrollToTopElement) {
        this.scrollToTopElement.nativeElement.scrollIntoView({behavior: 'smooth'});
      }
    });
  }

  copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text)
      .catch((err) => {
        console.error('Failed to copy text to clipboard: ', err);
      });
  }
}
