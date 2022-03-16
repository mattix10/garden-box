import { HttpClient, HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { defer, of } from "rxjs";
import { ImageService } from "./image.service"
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from "src/environments/environment";

describe('ImageService', () => {
  let imageService: ImageService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let testUrl: string = `${environment.API_URL}/plant/images`;
  
  beforeEach(() => {
  httpClientSpy = jasmine.createSpyObj('HttpClient', ['post', 'get', 'delete']);
	
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        ImageService,
        {provide: HttpClient, useValue: httpClientSpy}
      ]
    });

		imageService = TestBed.inject(ImageService);
		httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });


	it('should return images', () => {
		const images: any[] = []
		httpClientSpy.get.and.returnValue(of(images));

		imageService.getImages().subscribe({
      next: images => {
        expect(images).toEqual([]);
      }
    })

    expect(httpClientSpy.get.calls.count())
      .withContext('one call')
      .toBe(1);
  });

	it('should remove image', () => {
		const imageName: string = 'example.jpg'
		httpClientSpy.delete.and.returnValue(of([]));

		imageService.removeImage(imageName).subscribe({
      next: images => {
        expect(images).toEqual([]);
      }
    })

    expect(httpClientSpy.delete.calls.count())
      .withContext('one call')
      .toBe(1);
  });

	it('should upload image', () => {
		const formData: FormData =  new FormData();
		const message: string = 'Succes';
		httpClientSpy.post.and.returnValue(of(message));

		imageService.upload(formData)
			.subscribe({
				next: msg => {
					expect(msg).toEqual(message);
				}
			}) 

		expect(httpClientSpy.post.calls.count())
      .withContext('one call')
      .toBe(1);
	});

	// it('should return images with HTTPClient', () => {
	// 	const images: any[] = []
	// 	httpClient.get<any>(testUrl)
	// 		.subscribe(data => {
	// 			expect(data).toEqual(images)
	// 		})
		
	// 	const req = httpTestingController.expectOne(testUrl);
	// 	expect(req.request.method).toEqual('GET');
	// 	req.flush(images);

	// 	httpTestingController.verify();
	// })

	
	// it('should remove image with HTTPClient', () => {
	// 	const imageName: string = 'example.jpg'
	// 	httpClient.delete<any>(testUrl + '/' + imageName)
	// 		.subscribe(data => {
	// 			expect(data).toEqual(null)
	// 		})

	// 		const req = httpTestingController.expectOne(testUrl + '/' + imageName);
	// 		expect(req.request.method).toEqual('DELETE');
	// 		req.flush(null);

	// 		httpTestingController.verify();
	// })

	// it('should upload image HTTP', () => {
	// 	const formData: FormData =  new FormData();
	// 	const message: string = 'Succes';

	// 	httpClient.post<any>(testUrl, formData).subscribe(data => {
	// 			expect(data).toEqual(formData)
	// 		})

	// 		const req = httpTestingController.expectOne(testUrl);
	// 		expect(req.request.method).toEqual('POST');
	// 		req.flush(formData);

	// 		httpTestingController.verify();
	// 	})

	// afterEach(() => {
	// 	// After every test, assert that there are no more pending requests.
	// 	httpTestingController.verify();
	//   });

})

export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}