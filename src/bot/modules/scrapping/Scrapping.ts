import type { ScrappingExtract } from './interfaces/ScrappingExtract';
import { ScrappingAuthoritiesCAI } from './sites/ScrappingAuthoritiesCAI';
import { ScrappingURL } from './constants/ScrappingURL';
import { ScrappingAuthoritiesCooperadora } from './sites/ScrappingAuthoritiesCooperadora';
import { ScrappingAuthoritiesExecutives } from './sites/ScrappingAuthoritiesExecutives';
import { ScrappingCareers } from './sites/ScrappingCareers';
import { ScrappingHome } from './sites/ScrappingHome';
import { ScrappingStudentsCertificates } from './sites/ScrappingStudentsCertificates';
import { ScrappingStudentsChairPrograms } from './sites/ScrappingStudentsChairPrograms';
import { ScrappingStudentsEquivalences } from './sites/ScrappingStudentsEquivalences';
import { ScrappingStudentsExamTables } from './sites/ScrappingStudentsExamTables';
import { ScrappingStudentsResolutions } from './sites/ScrappingStudentsResolutions';
import { ScrappingStudentsSchedules } from './sites/ScrappingStudentsSchedules';
import { ScrappingStudentsSubjectRegistration } from './sites/ScrappingStudentsSubjectRegistration';
import { SummarizeFolder } from '../summarize/SummarizeFolder';
import { ConsoleFlags } from '../../common/classes/ConsoleFlags';
import { cleanNamePath } from '../../common/utils/CleanNamePath';
import path from 'path';
import mime from 'mime';
import fs from 'fs';

export class Scrapping {
  private scrappers: ScrappingExtract[];
  private assetsFolder: string;
  private summarize: SummarizeFolder;
  private consoleFlags: ConsoleFlags;

  constructor(folder: string) {
    this.scrappers = [
      // Authorities
      new ScrappingAuthoritiesCAI(ScrappingURL.AUTHORITIES.CAI),
      new ScrappingAuthoritiesCooperadora(ScrappingURL.AUTHORITIES.COOPERADORA),
      new ScrappingAuthoritiesExecutives(ScrappingURL.AUTHORITIES.EXECUTIVES),

      // Careers
      ...ScrappingURL.CAREERS.map((CAREER) => new ScrappingCareers(CAREER)),

      // Home Page
      new ScrappingHome(ScrappingURL.HOME),

      // Students
      new ScrappingStudentsCertificates(ScrappingURL.STUDENTS.CERTIFICATES),
      new ScrappingStudentsChairPrograms(ScrappingURL.STUDENTS.CHAIR_PROGRAMS),
      new ScrappingStudentsEquivalences(ScrappingURL.STUDENTS.EQUIVALENCES),
      new ScrappingStudentsExamTables(ScrappingURL.STUDENTS.EXAM_TABLES),
      new ScrappingStudentsResolutions(ScrappingURL.STUDENTS.RESOLUTIONS),
      new ScrappingStudentsSchedules(ScrappingURL.STUDENTS.SCHEDULES),
      new ScrappingStudentsSubjectRegistration(
        ScrappingURL.STUDENTS.SUBJECT_REGISTRATION,
      ),
    ];

    this.assetsFolder = folder;
    this.summarize = new SummarizeFolder(folder);
    this.consoleFlags = new ConsoleFlags();
  }

  private createFile(fileName: string, content: string) {
    if (!fs.existsSync(this.assetsFolder)) {
      fs.mkdirSync(this.assetsFolder);
    }

    fs.writeFileSync(
      path.resolve(this.assetsFolder, cleanNamePath(fileName) + '.txt'),
      content,
      'utf-8',
    );
  }

  private clearFolder() {
    if (!fs.existsSync(this.assetsFolder)) {
      return;
    }

    const folder = fs.readdirSync(this.assetsFolder, { withFileTypes: true });
    const files = folder.filter(
      (file) =>
        file.isFile() &&
        (mime.getType(file.name) === 'text/plain' ||
          mime.getType(file.name) === 'text/markdown'),
    );

    for (const file of files) {
      fs.unlinkSync(path.resolve(file.parentPath, file.name));
    }

    const originFolder = path.resolve(this.assetsFolder, '_origin');

    if (fs.existsSync(originFolder)) {
      fs.rmdirSync(originFolder, { recursive: true });
    }
  }

  public async start() {
    if (!this.consoleFlags.getFlag<boolean>('only-summarize')) {
      this.clearFolder();

      for (const item of this.scrappers) {
        const fileContent = await item.extract();

        console.info(`${item.getName()}: OK`);
        this.createFile(item.getName(), fileContent);
      }
    }

    await this.summarize.initialize();
    await this.summarize.summarizeFolder();
  }
}
