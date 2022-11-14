import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/models/game';
import { APIResponse } from 'src/app/models/response';
import { GamesService } from 'src/app/services/games.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private routeSub!: Subscription
  private gameSub!: Subscription

  sort: string = 'metacrit';
  games: Array<Game> = []

  constructor(
    private http: GamesService,
    private activateRoute: ActivatedRoute,
    private router: Router,
  ) {
  }


  ngOnInit(): void {
    this.activateRoute.params.subscribe((params: Params) => {
      this.getGames(this.sort, params?.['search'])
    })
  }

  getGames(sort: string, search?: string) {
    this.gameSub = this.http.getGames(sort, search)
      .subscribe((data: APIResponse<Game>) => {
        this.games = data.results
      })
  }

  openGameDetails(id: string): void {
    this.router.navigate(['games', id]);
  }

  ngOnDestroy(): void {
    if (this.gameSub) {
      this.gameSub.unsubscribe()
    }

    if (this.routeSub) {
      this.routeSub.unsubscribe()
    }
  }

}
