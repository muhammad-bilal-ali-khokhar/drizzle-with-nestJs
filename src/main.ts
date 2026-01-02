/**
 * Application Bootstrap
 * 
 * Main entry point for the NestJS application.
 * Configures database connection, Swagger documentation, and starts the server.
 * 
 * @author Muhammad Bilal
 * @version 1.0.0
 */

import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

/**
 * Bootstrap function to initialize and start the application
 * Handles database connection testing, Swagger setup, and server startup
 */
async function bootstrap() {
  const logger = new Logger('Bootstrap');
  try {
    logger.log('🔄 Starting application...');
    
    // Test database connection before starting the application
    logger.log('🔌 Testing database connection...');
    logger.log('📊 Database URL format check:', process.env.DATABASE_URL?.replace(/:[^:@]*@/, ':****@'));
    try {
      const { db } = await import('./database/db');
      await db.execute('SELECT 1');
      logger.log('✅ Database connection successful');
    } catch (dbError) {
      logger.error('❌ Database connection failed:');
      if (dbError.cause?.code === 'XX000') {
        logger.error('🚫 Invalid database credentials or tenant not found');
        logger.error('💡 Check your DATABASE_URL in .env file');
        logger.error('🔄 Try regenerating your Supabase database password');
      } else if (dbError.cause?.code === 'ENOTFOUND') {
        logger.error('🌐 Database host not found - check your connection');
      } else {
        logger.error('🔍 Database error:', dbError.cause?.message || dbError.message);
      }
      throw dbError;
    }
    
    // Create NestJS application instance
    const app = await NestFactory.create(AppModule);
    logger.log('✅ NestJS application created successfully');

    // Configure Swagger API documentation
    logger.log('📚 Setting up Swagger documentation...');
     const swaggerConfig = new DocumentBuilder()
      .setTitle('Todo API')
      .setDescription('Todo management API')
      .setVersion('1.0')
      .addTag('todos')
      .build();
    const documentFactory = () => SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api', app, documentFactory);
    logger.log('✅ Swagger documentation configured');
    
    // Start the server
    const port = process.env.PORT ?? 3002;
    logger.log(`🚀 Starting server on port ${port}...`);
    await app.listen(port);
    logger.log(`✅ Application is running on: http://localhost:${port}`);
    logger.log(`📖 Swagger is running on: http://localhost:${port}/api`);
    logger.log('💚 Application startup completed successfully');
  } catch (error) {
    logger.error('❌ Failed to start application', error.message);
    process.exit(1);
  }
}

// Start the application and handle any bootstrap errors
bootstrap().catch((error) => {
  console.error('Bootstrap failed:', error);
  process.exit(1);
});
