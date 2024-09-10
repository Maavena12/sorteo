import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CantidadEquiposComponent } from './cantidad-equipos/cantidad-equipos.component';
import { ConfiguracionSorteoComponent } from './configuracion-sorteo/configuracion-sorteo.component';
import { SorteoFinalComponent } from './sorteo-final/sorteo-final.component';
import { ConfiguracionLiguillaComponent } from './configuracion-liguilla/configuracion-liguilla.component';
import { ConfiguracionFinalLiguillaComponent } from './configuracion-final-liguilla/configuracion-final-liguilla.component';
import { SorteoFinalLiguillaComponent } from './sorteo-final-liguilla/sorteo-final-liguilla.component';
import { CantidadEquiposEliminatoriasComponent } from './cantidad-equipos-eliminatorias/cantidad-equipos-eliminatorias.component';
import { ConfiguracionEliminatoriaComponent } from './configuracion-eliminatoria/configuracion-eliminatoria.component';
import { SorteoFinalEliminatoriasComponent } from './sorteo-final-eliminatorias/sorteo-final-eliminatorias.component';
import { ChampionsLeagueFormatComponent } from './champions-league-format/champions-league-format.component';
import { CantidadEquiposChampionsComponent } from './cantidad-equipos-champions/cantidad-equipos-champions.component';
import { SorteoFinalChampionsComponent } from './sorteo-final-champions/sorteo-final-champions.component';

export const routes: Routes = [
    {
        path: "",
        component: HomeComponent
    },
    {
        path: "fase-de-grupos",
        component: CantidadEquiposComponent
    },
    {
        path: "liguilla",
        component: ConfiguracionLiguillaComponent
    },
    {
        path: "fase-eliminatoria",
        component: CantidadEquiposEliminatoriasComponent
    },
    {
        path: "fase-champions",
        component: CantidadEquiposChampionsComponent
    },
    {
        path: "configuracion-sorteo/:equipos",
        component: ConfiguracionSorteoComponent
    },
    {
        path: "configuracion-eliminatoria/:equipos",
        component: ConfiguracionEliminatoriaComponent
    },
    {
        path: "configuracion-sorteo-liguilla/:equipos",
        component: ConfiguracionFinalLiguillaComponent
    },
    {
        path: "sorteo-final/:equipos/:divisor/:seleccionarPartido/:cantidadClasificados",
        component: SorteoFinalComponent
    },
    {
        path: "sorteo-final-liguilla/:equipos/:divisor/:seleccionarPartido/:cantidadClasificados",
        component: SorteoFinalLiguillaComponent
    },
    {
        path: "sorteo-final-eliminatoria/:equipos/:seleccionarPartido",
        component: SorteoFinalEliminatoriasComponent
    },
    {
        path: "champions-league-format/:equipos",
        component: ChampionsLeagueFormatComponent
    },
    {
        path: "sorteo-final-champions/:equipos/:octavos/:comparar/:seleccionarPartido",
        component: SorteoFinalChampionsComponent
    }
];
