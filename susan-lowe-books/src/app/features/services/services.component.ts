import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';

interface Service {
  icon: string;
  title: string;
  description: string;
  features: string[];
  category: 'counseling' | 'holistic' | 'coaching' | 'medical';
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatExpansionModule
  ],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {
  contactPhone = '+1 876-942-9148';
  contactWebsite = 'http://www.onlinecounsellingjamaica.com';

  services: Service[] = [
    {
      icon: 'psychology',
      title: 'Online Counseling',
      description: 'One of the Caribbean\'s first online coaching & counselling services offered by a registered physician.',
      features: [
        'Video and phone sessions',
        'Secure and confidential',
        'Available across Jamaica and internationally',
        'Flexible scheduling'
      ],
      category: 'counseling'
    },
    {
      icon: 'spa',
      title: 'Holistic Medicine',
      description: 'Integrative approach combining conventional medicine with natural therapies and lifestyle factors.',
      features: [
        'Alternative therapy approaches',
        'Nutritional counseling',
        'Lifestyle medicine',
        'Natural remedies'
      ],
      category: 'holistic'
    },
    {
      icon: 'healing',
      title: 'Pain Management',
      description: 'Comprehensive pain management using integrative medical approaches.',
      features: [
        'Chronic pain treatment',
        'Natural pain relief methods',
        'Lifestyle modifications',
        'Holistic pain solutions'
      ],
      category: 'medical'
    },
    {
      icon: 'self_improvement',
      title: 'Transformational Coaching',
      description: 'Life coaching based on transformational positive psychology principles.',
      features: [
        'Personal development',
        'Life transitions support',
        'Goal achievement',
        'Positive psychology techniques'
      ],
      category: 'coaching'
    },
    {
      icon: 'favorite',
      title: 'Human Sexuality Counseling',
      description: 'Professional guidance on sexual health and relationship concerns.',
      features: [
        'Individual sessions',
        'Couples counseling',
        'Evidence-based approach',
        'Confidential support'
      ],
      category: 'counseling'
    },
    {
      icon: 'medical_services',
      title: 'Integrative General Practice',
      description: 'Comprehensive medical care combining conventional and complementary approaches.',
      features: [
        'Primary care services',
        'Preventive medicine',
        'Chronic disease management',
        'Holistic treatment plans'
      ],
      category: 'medical'
    }
  ];

  specializations = [
    'Surgery',
    'Radiology',
    'Anaesthetics & Intensive Care',
    'Community Health',
    'Psychology',
    'Life Sciences'
  ];

  testimonials = [
    {
      text: 'A very mature, truly caring, no-nonsense, knowledgeable counsellor and an active general practitioner with well learned, alternative therapy secret weapons.',
      author: 'Patient Testimonial'
    },
    {
      text: 'Dr. Lowe is very comfortable with both "regular" and natural therapies, making her approach truly integrative.',
      author: 'Client Review'
    },
    {
      text: 'Embraces the holistic approach to medicine as well as incorporating nutrition and other lifestyle-related factors in practice.',
      author: 'Professional Colleague'
    }
  ];
}
