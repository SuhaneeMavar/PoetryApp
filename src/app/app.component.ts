import { Component, OnInit, Inject, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';
import { DOCUMENT } from '@angular/common';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { PoemService } from './services/poem.service';
import { Poem } from './models/poem';
import { User } from './models/user';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    private _router: Subscription;
    poem:Poem=new Poem()


    user:User=new User()
    @ViewChild(NavbarComponent) navbar: NavbarComponent;

    constructor(private authService:AuthService,private userService:UserService,private poemService: PoemService, private renderer: Renderer2, private router: Router, @Inject(DOCUMENT,) private document: any, private element: ElementRef, public location: Location) {
        if(this.authService.isLogined())
            this.router.navigate(['/app'])
     }
    ngOnInit() {
        this.poemService.getPoemById('61167749314d402300ff0a79').subscribe(data => {
            this.poem=data
            // console.log(this.poem);
        })

        this.userService.getUserByEmail("suhaneemavar@gmail.com").subscribe(data=>{
            // console.log(data);
            
        })

        this.userService.getUserById("6116157e33ee2723709b5bd3").subscribe(data=>{
            this.user=data
            // console.log(this.user);
            
        })


        this.poemService.getAllPoems().subscribe(data => {
            //  console.log(data);
        })


        var navbar: HTMLElement = this.element.nativeElement.children[0].children[0];
        this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
            if (window.outerWidth > 991) {
                window.document.children[0].scrollTop = 0;
            } else {
                window.document.activeElement.scrollTop = 0;
            }
            this.navbar.sidebarClose();
        });
        this.renderer.listen('window', 'scroll', (event) => {
            const number = window.scrollY;
            if (number > 150 || window.pageYOffset > 150) {
                // add logic
                navbar.classList.remove('navbar-transparent');
            } else {
                // remove logic
                navbar.classList.add('navbar-transparent');
            }
        });
        var ua = window.navigator.userAgent;
        var trident = ua.indexOf('Trident/');
        if (trident > 0) {
            // IE 11 => return version number
            var rv = ua.indexOf('rv:');
            var version = parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        }
        if (version) {
            var body = document.getElementsByTagName('body')[0];
            body.classList.add('ie-background');

        }

    }
    removeFooter() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        titlee = titlee.slice(1);
        if (titlee === 'signup' || titlee === 'nucleoicons') {
            return false;
        }
        else {
            return true;
        }
    }
}
