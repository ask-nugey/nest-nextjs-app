import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { writeFileSync } from 'fs';
import { join } from 'path';
import * as yaml from 'yaml';

async function generateOpenAPI() {
  const app = await NestFactory.create(AppModule, { logger: false });
  
  const config = new DocumentBuilder()
    .setTitle('Frontend Recruit')
    .setVersion('1.0')
    .addTag('frontend')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  const outputPath = join(__dirname, '..', 'openapi.yml');
  
  // Convert to YAML format
  const yamlString = yaml.stringify(document);
  
  writeFileSync(outputPath, yamlString, 'utf8');
  console.log(`OpenAPI specification generated at: ${outputPath}`);
  
  await app.close();
}

generateOpenAPI().catch((error) => {
  console.error('Error generating OpenAPI specification:', error);
  process.exit(1);
});
