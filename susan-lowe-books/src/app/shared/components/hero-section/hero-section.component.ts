import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatIconModule],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss'
})
export class HeroSectionComponent {
  title = input<string>('Susan Lowe');
  subtitle = input<string>('Author • Therapist • Medical Doctor');
  description = input<string>('Explore captivating stories of Jamaican culture, medical journeys, and compelling fiction.');
  ctaText = input<string>('Explore Books');
  ctaLink = input<string>('/books');
  backgroundImage = input<string>('/assets/images/tree.png');
}
