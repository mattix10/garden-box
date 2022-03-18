import { TestBed, async, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, Routes } from '@angular/router'
import { NgModuleFactoryLoader } from '@angular/core';
import { Location } from '@angular/common';
import { AuthGuard } from './core/guards/auth.guard';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { AppRoutingModule } from './app-routing.module';

const routes: Routes = [
    {
      path: '', loadChildren:  () => import('./auth/auth.module').then(mod => mod.AuthModule)
    },
    {
      path: 'panel', loadChildren:  () => import('./dashboard/dashboard.module').then(mod => mod.DashboardModule), canActivate: [AuthGuard]
    },
    {
      path: '',
      redirectTo: '/zaloguj',
      pathMatch: 'full' 
    },
  ];

fdescribe('App routing', () => {
    let fixture: ComponentFixture<AppComponent>;
    let component: AppComponent;
    let router: Router;
    let location: Location;

    beforeEach(async() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes(routes),
                AppRoutingModule
            ]
            
        });
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    router.initialNavigation();
    })

    it('should test the lazy module', fakeAsync(() => {
        const loader = TestBed.get(NgModuleFactoryLoader);
        loader.stubbedModules = { lazyModule: AppRoutingModule};

        router.navigateByUrl('');

        tick();
        fixture.detectChanges();

        expect(location.path()).toBe('');
    }))
})