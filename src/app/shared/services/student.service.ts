import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface StudentQueryParams {
  page?: number;
  pageSize?: number;
  search?: string;
  filters?: { [key: string]: string };
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface StudentResponse {
  data: any[];
  totalItems: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
}

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private baseUrl = 'https://api.schoolkit.com'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  /**
   * Get students with pagination, search, filtering, and sorting
   * Example usage with the query parameters you provided:
   * ?page=2&pageSize=10&search=developer&filters[category]=IT&filters[location]=Lagos&sort_by=date&sort_order=desc
   */
  getStudents(params: StudentQueryParams): Observable<StudentResponse> {
    let httpParams = new HttpParams();

    // Add pagination parameters
    if (params.page) {
      httpParams = httpParams.set('page', params.page.toString());
    }
    if (params.pageSize) {
      httpParams = httpParams.set('pageSize', params.pageSize.toString());
    }

    // Add search parameter
    if (params.search) {
      httpParams = httpParams.set('search', params.search);
    }

    // Add filter parameters
    if (params.filters) {
      Object.keys(params.filters).forEach((key) => {
        if (params.filters![key]) {
          httpParams = httpParams.set(`filters[${key}]`, params.filters![key]);
        }
      });
    }

    // Add sorting parameters
    if (params.sortBy) {
      httpParams = httpParams.set('sort_by', params.sortBy);
    }
    if (params.sortOrder) {
      httpParams = httpParams.set('sort_order', params.sortOrder);
    }

    // For demo purposes, return mock data. Replace with actual API call:
    // return this.http.get<StudentResponse>(`${this.baseUrl}/students`, { params: httpParams });

    return this.getMockStudents(params);
  }

  /**
   * Get parents with similar query parameters
   */
  getParents(params: StudentQueryParams): Observable<StudentResponse> {
    let httpParams = new HttpParams();

    if (params.page) httpParams = httpParams.set('page', params.page.toString());
    if (params.pageSize) httpParams = httpParams.set('pageSize', params.pageSize.toString());
    if (params.search) httpParams = httpParams.set('search', params.search);
    if (params.sortBy) httpParams = httpParams.set('sort_by', params.sortBy);
    if (params.sortOrder) httpParams = httpParams.set('sort_order', params.sortOrder);

    // For demo purposes, return mock data. Replace with actual API call:
    // return this.http.get<StudentResponse>(`${this.baseUrl}/parents`, { params: httpParams });

    return this.getMockParents(params);
  }

  /**
   * Mock implementation - replace with actual API calls
   */
  private getMockStudents(params: StudentQueryParams): Observable<StudentResponse> {
    // Simulate API call delay
    const mockData = {
      data: [
        {
          id: 'STU001',
          firstName: 'John',
          lastName: 'Developer',
          email: 'john.developer@email.com',
          category: 'IT',
          location: 'Lagos',
          dateCreated: '2024-10-01',
          // ... other fields
        },
        {
          id: 'STU002',
          firstName: 'Jane',
          lastName: 'Designer',
          email: 'jane.designer@email.com',
          category: 'Design',
          location: 'Lagos',
          dateCreated: '2024-09-28',
          // ... other fields
        },
        // Add more mock data as needed
      ],
      totalItems: 50,
      currentPage: params.page || 1,
      pageSize: params.pageSize || 10,
      totalPages: Math.ceil(50 / (params.pageSize || 10)),
    };

    return of(mockData).pipe(delay(500)); // Simulate network delay
  }

  private getMockParents(params: StudentQueryParams): Observable<StudentResponse> {
    const mockData = {
      data: [
        {
          id: 'PAR001',
          firstName: 'Robert',
          lastName: 'Developer',
          email: 'robert.developer@email.com',
          relationship: 'Father',
          // ... other fields
        },
        // Add more mock data as needed
      ],
      totalItems: 25,
      currentPage: params.page || 1,
      pageSize: params.pageSize || 10,
      totalPages: Math.ceil(25 / (params.pageSize || 10)),
    };

    return of(mockData).pipe(delay(500));
  }

  /**
   * Build query string from parameters (utility method)
   * Example: buildQueryString({ page: 2, pageSize: 10, search: 'developer', filters: { category: 'IT' } })
   * Returns: "?page=2&pageSize=10&search=developer&filters[category]=IT"
   */
  buildQueryString(params: StudentQueryParams): string {
    const queryParams: string[] = [];

    if (params.page) queryParams.push(`page=${params.page}`);
    if (params.pageSize) queryParams.push(`pageSize=${params.pageSize}`);
    if (params.search) queryParams.push(`search=${encodeURIComponent(params.search)}`);

    if (params.filters) {
      Object.keys(params.filters).forEach((key) => {
        if (params.filters![key]) {
          queryParams.push(`filters[${key}]=${encodeURIComponent(params.filters![key])}`);
        }
      });
    }

    if (params.sortBy) queryParams.push(`sort_by=${params.sortBy}`);
    if (params.sortOrder) queryParams.push(`sort_order=${params.sortOrder}`);

    return queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
  }

  /**
   * Parse query string into parameters object (utility method)
   * Example: parseQueryString("?page=2&pageSize=10&search=developer&filters[category]=IT&sort_by=date&sort_order=desc")
   */
  parseQueryString(queryString: string): StudentQueryParams {
    const params: StudentQueryParams = { filters: {} };

    if (!queryString || queryString === '?') return params;

    const urlParams = new URLSearchParams(
      queryString.startsWith('?') ? queryString.slice(1) : queryString
    );

    urlParams.forEach((value, key) => {
      if (key === 'page') {
        params.page = parseInt(value) || 1;
      } else if (key === 'pageSize') {
        params.pageSize = parseInt(value) || 10;
      } else if (key === 'search') {
        params.search = value;
      } else if (key === 'sort_by') {
        params.sortBy = value;
      } else if (key === 'sort_order') {
        params.sortOrder = value as 'asc' | 'desc';
      } else if (key.startsWith('filters[') && key.endsWith(']')) {
        const filterKey = key.substring(8, key.length - 1);
        if (!params.filters) params.filters = {};
        params.filters[filterKey] = value;
      }
    });

    return params;
  }
}
