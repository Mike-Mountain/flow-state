import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

export interface Project {
  id: string;
  title: string;
  slug: string;
  url: string;
  githubUrl: string;
  screenshots: any[];
  video?: File;
}

export function createProject(params?: Partial<Project>): Partial<Project> {
  return {
    id: params?.id,
    title: params?.title,
    slug: params?.slug,
    url: params?.url,
    githubUrl: params?.url,
    screenshots: params?.screenshots ?? [],
    video: params?.video
  } as Project;
}

export function createProjectsForm(formBuilder: FormBuilder, params?: Partial<Project>): FormGroup {
  return formBuilder.group({
    title: [params?.title ?? '', Validators.required],
    slug: [params?.slug ?? '', Validators.required],
    url: [params?.url ?? '', Validators.required],
    githubUrl: [params?.githubUrl ?? '', Validators.required],
    screenshots: createScreenshotArray(params?.screenshots),
    video: [params?.video]
  });
}

export function createScreenshotArray(screenshots?: any[]) {
  let controls = [];
  if (screenshots?.length > 0) {
    controls = screenshots.map(screen => new FormControl(screen));
  }
  return new FormArray(controls);
}
