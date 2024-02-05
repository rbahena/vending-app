import { Component, Input } from '@angular/core';
import { userLogged } from 'src/app/modules/auth/models/login.interface';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent {
  @Input() currentUser: userLogged | null = null;
  
}
