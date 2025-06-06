﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using bakdel.Data;

#nullable disable

namespace bakdel.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "9.0.5");

            modelBuilder.Entity("bakdel.Controllers.Models.Foresporsler", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<bool>("akseptert")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("dato")
                        .HasColumnType("TEXT");

                    b.Property<int>("eierID")
                        .HasColumnType("INTEGER");

                    b.Property<int>("passerID")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.ToTable("Foresporsler");
                });

            modelBuilder.Entity("bakdel.Controllers.Models.Hund", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("alder")
                        .HasColumnType("INTEGER");

                    b.Property<string>("navn")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("rase")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("spesielleBehov")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("hunder");
                });

            modelBuilder.Entity("bakdel.Controllers.Models.HundeEier", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("adresse")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("brukernavn")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("hundBildePlassering")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("hundID")
                        .HasColumnType("INTEGER");

                    b.Property<string>("passord")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("telefon")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("hundeEiere");
                });

            modelBuilder.Entity("bakdel.Controllers.Models.HundePasser", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("brukernavn")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("omraade")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("passord")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("pris")
                        .HasColumnType("INTEGER");

                    b.Property<string>("telefon")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("hundePassere");
                });
#pragma warning restore 612, 618
        }
    }
}
